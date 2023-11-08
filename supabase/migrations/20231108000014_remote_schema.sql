
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgroonga" WITH SCHEMA "public";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "wrappers" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."likes_count_trigger_function"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  NEW.likes_count := (SELECT COUNT(*) FROM public.strain_likes WHERE strain_likes."strainId" = NEW.id);
  RETURN NEW;
END;$$;

ALTER FUNCTION "public"."likes_count_trigger_function"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."search_strains"("search_term" "text", "limit_num" integer) RETURNS TABLE("slug" "text", "name" "text", "nugimage" "text")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  row_count int;
BEGIN
  RETURN QUERY 
  SELECT s.slug, s.name, s."nugImage"
  FROM public.public_strains s
  WHERE lower(s.name) = lower(search_term) 
  LIMIT limit_num;

  GET DIAGNOSTICS row_count = ROW_COUNT;
  
  IF row_count = 0 THEN
    RETURN QUERY 
    SELECT s.slug, s.name, s."nugImage"
    FROM public.public_strains s
    WHERE s.name &@~ search_term 
    LIMIT limit_num;
  END IF;
END; $$;

ALTER FUNCTION "public"."search_strains"("search_term" "text", "limit_num" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_likes_count"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
   IF (TG_OP = 'INSERT') THEN
      UPDATE strains
      SET likes_count = (SELECT COUNT(*) FROM public.strain_likes WHERE strain_likes.strain_id = strains.id)
      WHERE id = NEW.strain_id;
      RETURN NEW;
   ELSIF (TG_OP = 'DELETE') THEN
      UPDATE strains
      SET likes_count = (SELECT COUNT(*) FROM public.strain_likes WHERE strain_likes.strain_id = strains.id)
      WHERE id = OLD.strain_id;
      RETURN OLD;
   END IF;
END;
$$;

ALTER FUNCTION "public"."update_likes_count"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_public_profiles"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    user_meta_data json;
    display_name text;
    image text;
    location text;
    name text;
    about_me text;
    birth_date text;
    languages text;
BEGIN
    user_meta_data := NEW.raw_user_meta_data;
    display_name := COALESCE(user_meta_data->>'displayName', '');
    image := COALESCE(user_meta_data->>'image', '');
    location := COALESCE(user_meta_data->>'location', '');
    name := COALESCE(user_meta_data->>'name', '');
    about_me := COALESCE(user_meta_data->>'aboutMe', '');
    birth_date := COALESCE(user_meta_data->>'birthDate', '');
    languages := COALESCE(user_meta_data->>'languages', '');

    INSERT INTO public.profiles (id, "displayName", image, location, name, "aboutMe", "birthDate", languages)
    VALUES (NEW.id, display_name, image, location, name, about_me, birth_date, languages)
    ON CONFLICT (id) DO UPDATE 
    SET "displayName" = EXCLUDED."displayName",
        image = EXCLUDED.image,
        location = EXCLUDED.location,
        name = EXCLUDED.name,
        "aboutMe" = EXCLUDED."aboutMe",
        "birthDate" = EXCLUDED."birthDate",
        languages = EXCLUDED.languages;

    RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_public_profiles"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."backup_strains" (
    "id" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text",
    "subtitle" "text",
    "category" "text",
    "phenotype" "text",
    "averageRating" double precision,
    "shortDescription" "text",
    "description" "text",
    "nugImage" "text",
    "flowerImageSvg" "text",
    "topTerpene" "text",
    "thcPercent" double precision,
    "topEffect" "text",
    "cannabinoids" "jsonb",
    "effects" "jsonb",
    "terps" "jsonb",
    "dispensaryMenuId" "text",
    "likes_count" bigint DEFAULT '0'::bigint
);

ALTER TABLE "public"."backup_strains" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."dispensaries" (
    "id" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text",
    "description" "text",
    "address" "text",
    "city" "text",
    "phone" "text",
    "website" "text",
    "email" "text",
    "hours" "text",
    "latitude" double precision,
    "longitude" double precision,
    "averageRating" double precision,
    "image" "text",
    "logo" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);

ALTER TABLE "public"."dispensaries" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "displayName" "text" NOT NULL,
    "image" "text",
    "location" "text",
    "name" "text",
    "aboutMe" "text",
    "birthDate" "text",
    "languages" "text"
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."strain_comments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "strain_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "comment" "text" NOT NULL,
    CONSTRAINT "public_strain_comments_comment_check" CHECK ((("length"("comment") > 1) AND ("length"("comment") < 500)))
);

ALTER TABLE "public"."strain_comments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."strain_likes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid",
    "strain_id" "uuid"
);

ALTER TABLE "public"."strain_likes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."strains" (
    "id" "uuid" NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text",
    "subtitle" "text",
    "category" "text",
    "phenotype" "text",
    "averageRating" double precision,
    "shortDescription" "text",
    "description" "text",
    "nugImage" "text",
    "flowerImageSvg" "text",
    "topTerpene" "text",
    "thcPercent" double precision,
    "topEffect" "text",
    "cannabinoids" "jsonb",
    "effects" "jsonb",
    "terps" "jsonb",
    "dispensaryMenuId" "text",
    "likes_count" bigint DEFAULT '0'::bigint
);

ALTER TABLE "public"."strains" OWNER TO "postgres";

ALTER TABLE ONLY "public"."dispensaries"
    ADD CONSTRAINT "dispensaries_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "public_profiles_displayName_key" UNIQUE ("displayName");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "public_profiles_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."strain_comments"
    ADD CONSTRAINT "public_strain_comments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."strain_likes"
    ADD CONSTRAINT "public_strain_likes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."strains"
    ADD CONSTRAINT "public_strains_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."backup_strains"
    ADD CONSTRAINT "strains_pkey" PRIMARY KEY ("id");

CREATE UNIQUE INDEX "dispensaries_slug_key" ON "public"."dispensaries" USING "btree" ("slug");

CREATE INDEX "public_strains_name" ON "public"."strains" USING "pgroonga" ("name");

CREATE UNIQUE INDEX "public_strains_slug_idx" ON "public"."strains" USING "btree" ("slug");

CREATE UNIQUE INDEX "strains_slug_key" ON "public"."backup_strains" USING "btree" ("slug");

CREATE OR REPLACE TRIGGER "insert_delete_update_likes_count" AFTER INSERT OR DELETE ON "public"."strain_likes" FOR EACH ROW EXECUTE FUNCTION "public"."update_likes_count"();

CREATE OR REPLACE TRIGGER "update_likes_count_after_delete" AFTER DELETE ON "public"."strain_likes" FOR EACH ROW EXECUTE FUNCTION "public"."update_likes_count"();

CREATE OR REPLACE TRIGGER "update_likes_count_after_insert" AFTER INSERT ON "public"."strain_likes" FOR EACH ROW EXECUTE FUNCTION "public"."update_likes_count"();

CREATE OR REPLACE TRIGGER "update_likes_count_trigger" AFTER UPDATE ON "public"."backup_strains" FOR EACH ROW EXECUTE FUNCTION "public"."likes_count_trigger_function"();

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_comments"
    ADD CONSTRAINT "strain_comments_strain_id_fkey" FOREIGN KEY ("strain_id") REFERENCES "public"."strains"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_comments"
    ADD CONSTRAINT "strain_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_likes"
    ADD CONSTRAINT "strain_likes_strain_id_fkey" FOREIGN KEY ("strain_id") REFERENCES "public"."strains"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_likes"
    ADD CONSTRAINT "strain_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable all for users based on user_id" ON "public"."strain_likes" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable read access for all users" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."strains" FOR SELECT USING (true);

ALTER TABLE "public"."backup_strains" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "full_access_supabase_auth_admin" ON "public"."profiles" TO "supabase_auth_admin" USING (true) WITH CHECK (true);

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."strain_likes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."strains" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."likes_count_trigger_function"() TO "anon";
GRANT ALL ON FUNCTION "public"."likes_count_trigger_function"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."likes_count_trigger_function"() TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_command"("groongacommand" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_command"("groongacommand" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_command"("groongacommand" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_command"("groongacommand" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_command"("groongacommand" "text", "arguments" "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_command"("groongacommand" "text", "arguments" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_command"("groongacommand" "text", "arguments" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_command"("groongacommand" "text", "arguments" "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_command_escape_value"("value" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_command_escape_value"("value" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_command_escape_value"("value" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_command_escape_value"("value" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_contain_varchar_array"(character varying[], character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_contain_varchar_array"(character varying[], character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_contain_varchar_array"(character varying[], character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_contain_varchar_array"(character varying[], character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_equal_query_text_array"("targets" "text"[], "query" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_query_text_array"("targets" "text"[], "query" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_query_text_array"("targets" "text"[], "query" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_query_text_array"("targets" "text"[], "query" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_equal_query_varchar_array"("targets" character varying[], "query" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_query_varchar_array"("targets" character varying[], "query" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_query_varchar_array"("targets" character varying[], "query" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_query_varchar_array"("targets" character varying[], "query" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_equal_text"("target" "text", "other" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_text"("target" "text", "other" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_text"("target" "text", "other" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_text"("target" "text", "other" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_equal_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_equal_varchar"("target" character varying, "other" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_varchar"("target" character varying, "other" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_varchar"("target" character varying, "other" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_varchar"("target" character varying, "other" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_equal_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_equal_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" real) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" real) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" real) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" real) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" double precision) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" double precision) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" double precision) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" double precision) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" smallint) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" smallint) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" smallint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" smallint) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" bigint) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" bigint) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" timestamp without time zone) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" timestamp without time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" timestamp without time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" timestamp without time zone) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" timestamp with time zone) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" timestamp with time zone) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" "text", "special_characters" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" "text", "special_characters" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" "text", "special_characters" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_escape"("value" "text", "special_characters" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_flush"("indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_flush"("indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_flush"("indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_flush"("indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_handler"("internal") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_handler"("internal") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_handler"("internal") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_handler"("internal") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("targets" "text"[], "keywords" "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("targets" "text"[], "keywords" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("targets" "text"[], "keywords" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("targets" "text"[], "keywords" "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("target" "text", "keywords" "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("target" "text", "keywords" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("target" "text", "keywords" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("target" "text", "keywords" "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("targets" "text"[], "keywords" "text"[], "indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("targets" "text"[], "keywords" "text"[], "indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("targets" "text"[], "keywords" "text"[], "indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("targets" "text"[], "keywords" "text"[], "indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_highlight_html"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_index_column_name"("indexname" "cstring", "columnindex" integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_index_column_name"("indexname" "cstring", "columnindex" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_index_column_name"("indexname" "cstring", "columnindex" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_index_column_name"("indexname" "cstring", "columnindex" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_index_column_name"("indexname" "cstring", "columnname" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_index_column_name"("indexname" "cstring", "columnname" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_index_column_name"("indexname" "cstring", "columnname" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_index_column_name"("indexname" "cstring", "columnname" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_is_writable"() TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_is_writable"() TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_is_writable"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_is_writable"() TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_in_text"("text", "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_text"("text", "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_text"("text", "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_text"("text", "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_in_text_array"("text"[], "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_text_array"("text"[], "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_text_array"("text"[], "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_text_array"("text"[], "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_in_varchar"(character varying, character varying[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_varchar"(character varying, character varying[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_varchar"(character varying, character varying[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_in_varchar"(character varying, character varying[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_jsonb"("jsonb", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_jsonb"("jsonb", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_jsonb"("jsonb", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_jsonb"("jsonb", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_byte"("target" "text", "keywords" "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_byte"("target" "text", "keywords" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_byte"("target" "text", "keywords" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_byte"("target" "text", "keywords" "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_byte"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_byte"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_byte"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_byte"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_character"("target" "text", "keywords" "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_character"("target" "text", "keywords" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_character"("target" "text", "keywords" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_character"("target" "text", "keywords" "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_character"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_character"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_character"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_positions_character"("target" "text", "keywords" "text"[], "indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_query"("text"[], "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"("text"[], "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"("text"[], "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"("text"[], "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_query"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_query"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_query"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_regexp"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_regexp"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_regexp"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_regexp"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_regexp"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_regexp"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_regexp"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_regexp"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_script_jsonb"("jsonb", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_script_jsonb"("jsonb", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_script_jsonb"("jsonb", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_script_jsonb"("jsonb", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" "text"[], "term" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" "text"[], "term" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" "text"[], "term" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" "text"[], "term" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" character varying[], "term" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" character varying[], "term" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" character varying[], "term" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" character varying[], "term" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" "text", "term" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" "text", "term" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" "text", "term" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" "text", "term" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" character varying, "term" character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" character varying, "term" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" character varying, "term" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_term"("target" character varying, "term" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_text"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array"("text"[], "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array"("text"[], "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array"("text"[], "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array"("text"[], "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array_condition"("target" "text"[], "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array_condition"("target" "text"[], "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array_condition"("target" "text"[], "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array_condition"("target" "text"[], "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array_condition_with_scorers"("target" "text"[], "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array_condition_with_scorers"("target" "text"[], "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array_condition_with_scorers"("target" "text"[], "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_array_condition_with_scorers"("target" "text"[], "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_text_condition_with_scorers"("target" "text", "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_condition_with_scorers"("target" "text", "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_condition_with_scorers"("target" "text", "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_text_condition_with_scorers"("target" "text", "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar_condition_with_scorers"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar_condition_with_scorers"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar_condition_with_scorers"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_match_varchar_condition_with_scorers"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_normalize"("target" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_normalize"("target" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_normalize"("target" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_normalize"("target" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_normalize"("target" "text", "normalizername" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_normalize"("target" "text", "normalizername" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_normalize"("target" "text", "normalizername" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_normalize"("target" "text", "normalizername" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_not_prefix_in_text"("text", "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_not_prefix_in_text"("text", "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_not_prefix_in_text"("text", "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_not_prefix_in_text"("text", "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_text"("text", "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_text"("text", "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_text"("text", "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_text"("text", "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_text_array"("text"[], "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_text_array"("text"[], "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_text_array"("text"[], "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_text_array"("text"[], "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_varchar"(character varying, character varying[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_varchar"(character varying, character varying[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_varchar"(character varying, character varying[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_varchar"(character varying, character varying[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_varchar_array"(character varying[], character varying[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_varchar_array"(character varying[], character varying[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_varchar_array"(character varying[], character varying[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_in_varchar_array"(character varying[], character varying[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_text"("text", "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_text"("text", "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_text"("text", "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_text"("text", "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_text_array"("text"[], "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_text_array"("text"[], "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_text_array"("text"[], "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_text_array"("text"[], "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_varchar"(character varying, character varying[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_varchar"(character varying, character varying[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_varchar"(character varying, character varying[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_varchar"(character varying, character varying[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_varchar_array"(character varying[], character varying[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_varchar_array"(character varying[], character varying[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_varchar_array"(character varying[], character varying[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_in_varchar_array"(character varying[], character varying[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_text"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_text"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_text"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_text"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_text_array"("text"[], "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_text_array"("text"[], "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_text_array"("text"[], "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_text_array"("text"[], "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_varchar"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_varchar"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_varchar"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_varchar"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_varchar_array"(character varying[], character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_varchar_array"(character varying[], character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_varchar_array"(character varying[], character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_rk_varchar_array"(character varying[], character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text_array"("text"[], "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text_array"("text"[], "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text_array"("text"[], "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text_array"("text"[], "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text_condition"("text", "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text_condition"("text", "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text_condition"("text", "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_text_condition"("text", "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar_array"(character varying[], character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar_array"(character varying[], character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar_array"(character varying[], character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar_array"(character varying[], character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar_condition"("target" character varying, "conditoin" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar_condition"("target" character varying, "conditoin" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar_condition"("target" character varying, "conditoin" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_prefix_varchar_condition"("target" character varying, "conditoin" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_escape"("query" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_escape"("query" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_escape"("query" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_escape"("query" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_expand"("tablename" "cstring", "termcolumnname" "text", "synonymscolumnname" "text", "query" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_expand"("tablename" "cstring", "termcolumnname" "text", "synonymscolumnname" "text", "query" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_expand"("tablename" "cstring", "termcolumnname" "text", "synonymscolumnname" "text", "query" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_expand"("tablename" "cstring", "termcolumnname" "text", "synonymscolumnname" "text", "query" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_extract_keywords"("query" "text", "index_name" "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_extract_keywords"("query" "text", "index_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_extract_keywords"("query" "text", "index_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_extract_keywords"("query" "text", "index_name" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_in_text"("text", "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_text"("text", "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_text"("text", "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_text"("text", "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_in_text_array"("text"[], "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_text_array"("text"[], "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_text_array"("text"[], "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_text_array"("text"[], "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_in_varchar"(character varying, character varying[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_varchar"(character varying, character varying[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_varchar"(character varying, character varying[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_in_varchar"(character varying, character varying[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_jsonb"("jsonb", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_jsonb"("jsonb", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_jsonb"("jsonb", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_jsonb"("jsonb", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_text"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array"("text"[], "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array"("text"[], "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array"("text"[], "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array"("text"[], "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array_condition"("targets" "text"[], "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array_condition"("targets" "text"[], "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array_condition"("targets" "text"[], "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array_condition"("targets" "text"[], "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array_condition_with_scorers"("targets" "text"[], "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array_condition_with_scorers"("targets" "text"[], "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array_condition_with_scorers"("targets" "text"[], "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_array_condition_with_scorers"("targets" "text"[], "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_condition"("target" "text", "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_text_condition_with_scorers"("target" "text", "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_condition_with_scorers"("target" "text", "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_condition_with_scorers"("target" "text", "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_text_condition_with_scorers"("target" "text", "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar_condition"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar_condition_with_scorers"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar_condition_with_scorers"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar_condition_with_scorers"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_query_varchar_condition_with_scorers"("target" character varying, "condition" "public"."pgroonga_full_text_search_condition_with_scorers") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_regexp_in_text"("text", "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_in_text"("text", "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_in_text"("text", "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_in_text"("text", "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_regexp_in_varchar"(character varying, character varying[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_in_varchar"(character varying, character varying[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_in_varchar"(character varying, character varying[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_in_varchar"(character varying, character varying[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_regexp_text"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_text"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_text"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_text"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_regexp_varchar"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_varchar"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_varchar"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_regexp_varchar"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_result_to_jsonb_objects"("result" "jsonb") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_result_to_jsonb_objects"("result" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_result_to_jsonb_objects"("result" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_result_to_jsonb_objects"("result" "jsonb") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_result_to_recordset"("result" "jsonb") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_result_to_recordset"("result" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_result_to_recordset"("result" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_result_to_recordset"("result" "jsonb") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_score"("row" "record") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_score"("row" "record") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_score"("row" "record") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_score"("row" "record") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_score"("tableoid" "oid", "ctid" "tid") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_score"("tableoid" "oid", "ctid" "tid") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_score"("tableoid" "oid", "ctid" "tid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_score"("tableoid" "oid", "ctid" "tid") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_script_jsonb"("jsonb", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_script_jsonb"("jsonb", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_script_jsonb"("jsonb", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_script_jsonb"("jsonb", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_script_text"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_script_text"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_script_text"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_script_text"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_script_text_array"("text"[], "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_script_text_array"("text"[], "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_script_text_array"("text"[], "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_script_text_array"("text"[], "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_script_varchar"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_script_varchar"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_script_varchar"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_script_varchar"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_set_writable"("newwritable" boolean) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_set_writable"("newwritable" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_set_writable"("newwritable" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_set_writable"("newwritable" boolean) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_similar_text"("text", "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_text"("text", "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_text"("text", "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_text"("text", "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_similar_text_array"("text"[], "text") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_text_array"("text"[], "text") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_text_array"("text"[], "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_text_array"("text"[], "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_similar_varchar"(character varying, character varying) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_varchar"(character varying, character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_varchar"(character varying, character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_similar_varchar"(character varying, character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_snippet_html"("target" "text", "keywords" "text"[], "width" integer) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_snippet_html"("target" "text", "keywords" "text"[], "width" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_snippet_html"("target" "text", "keywords" "text"[], "width" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_snippet_html"("target" "text", "keywords" "text"[], "width" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_table_name"("indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_table_name"("indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_table_name"("indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_table_name"("indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_tokenize"("target" "text", VARIADIC "options" "text"[]) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_tokenize"("target" "text", VARIADIC "options" "text"[]) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_tokenize"("target" "text", VARIADIC "options" "text"[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_tokenize"("target" "text", VARIADIC "options" "text"[]) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_vacuum"() TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_vacuum"() TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_vacuum"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_vacuum"() TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_apply"() TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_apply"() TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_apply"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_apply"() TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_apply"("indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_apply"("indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_apply"("indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_apply"("indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"() TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"() TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"() TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("block" bigint, "offset" bigint) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("block" bigint, "offset" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("block" bigint, "offset" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("block" bigint, "offset" bigint) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("indexname" "cstring", "block" bigint, "offset" bigint) TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("indexname" "cstring", "block" bigint, "offset" bigint) TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("indexname" "cstring", "block" bigint, "offset" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_set_applied_position"("indexname" "cstring", "block" bigint, "offset" bigint) TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_status"() TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_status"() TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_status"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_status"() TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_truncate"() TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_truncate"() TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_truncate"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_truncate"() TO "service_role";

GRANT ALL ON FUNCTION "public"."pgroonga_wal_truncate"("indexname" "cstring") TO "postgres";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_truncate"("indexname" "cstring") TO "anon";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_truncate"("indexname" "cstring") TO "authenticated";
GRANT ALL ON FUNCTION "public"."pgroonga_wal_truncate"("indexname" "cstring") TO "service_role";

GRANT ALL ON FUNCTION "public"."search_strains"("search_term" "text", "limit_num" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."search_strains"("search_term" "text", "limit_num" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_strains"("search_term" "text", "limit_num" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."update_likes_count"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_likes_count"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_likes_count"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_public_profiles"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_public_profiles"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_public_profiles"() TO "service_role";

GRANT ALL ON TABLE "public"."backup_strains" TO "anon";
GRANT ALL ON TABLE "public"."backup_strains" TO "authenticated";
GRANT ALL ON TABLE "public"."backup_strains" TO "service_role";

GRANT ALL ON TABLE "public"."dispensaries" TO "anon";
GRANT ALL ON TABLE "public"."dispensaries" TO "authenticated";
GRANT ALL ON TABLE "public"."dispensaries" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";
GRANT ALL ON TABLE "public"."profiles" TO "supabase_auth_admin";

GRANT ALL ON TABLE "public"."strain_comments" TO "anon";
GRANT ALL ON TABLE "public"."strain_comments" TO "authenticated";
GRANT ALL ON TABLE "public"."strain_comments" TO "service_role";

GRANT ALL ON TABLE "public"."strain_likes" TO "anon";
GRANT ALL ON TABLE "public"."strain_likes" TO "authenticated";
GRANT ALL ON TABLE "public"."strain_likes" TO "service_role";

GRANT ALL ON TABLE "public"."strains" TO "anon";
GRANT ALL ON TABLE "public"."strains" TO "authenticated";
GRANT ALL ON TABLE "public"."strains" TO "service_role";
GRANT ALL ON TABLE "public"."strains" TO "supabase_auth_admin";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
