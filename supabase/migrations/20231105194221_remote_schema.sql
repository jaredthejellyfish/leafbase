
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

CREATE OR REPLACE FUNCTION "public"."update_likes_count"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
   IF (TG_OP = 'INSERT') THEN
      UPDATE public_strains
      SET likes_count = (SELECT COUNT(*) FROM public.public_strain_likes WHERE public_strain_likes.strain_id = public_strains.id)
      WHERE id = NEW.strain_id;
      RETURN NEW;
   ELSIF (TG_OP = 'DELETE') THEN
      UPDATE public_strains
      SET likes_count = (SELECT COUNT(*) FROM public.public_strain_likes WHERE public_strain_likes.strain_id = public_strains.id)
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

    INSERT INTO public.public_profiles (id, "displayName", image, location, name, "aboutMe", "birthDate", languages)
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

CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."accounts" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "type" "text" NOT NULL,
    "provider" "text" NOT NULL,
    "providerAccountId" "text" NOT NULL,
    "refresh_token" "text",
    "access_token" "text",
    "expires_at" integer,
    "token_type" "text",
    "scope" "text",
    "id_token" "text",
    "session_state" "text"
);

ALTER TABLE "public"."accounts" OWNER TO "postgres";

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

CREATE TABLE IF NOT EXISTS "public"."dispensary_comment_likes" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "commentId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."dispensary_comment_likes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."dispensary_comments" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "body" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dispensaryId" "text" NOT NULL
);

ALTER TABLE "public"."dispensary_comments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."dispensary_menus" (
    "id" "text" NOT NULL,
    "dispensaryId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "prices" "jsonb"[]
);

ALTER TABLE "public"."dispensary_menus" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."dispensary_subscriptions" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "dispensaryId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."dispensary_subscriptions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."public_profiles" (
    "id" "uuid" NOT NULL,
    "displayName" "text" NOT NULL,
    "image" "text",
    "location" "text",
    "name" "text",
    "aboutMe" "text",
    "birthDate" "text",
    "languages" "text"
);

ALTER TABLE "public"."public_profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."public_strain_likes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid",
    "strain_id" "uuid"
);

ALTER TABLE "public"."public_strain_likes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."public_strains" (
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

ALTER TABLE "public"."public_strains" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."sessions" (
    "id" "text" NOT NULL,
    "sessionToken" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "expires" timestamp(3) without time zone NOT NULL
);

ALTER TABLE "public"."sessions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."strain_comment_likes" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "commentId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."strain_comment_likes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."strain_comments" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "strainId" "text" NOT NULL,
    "body" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."strain_comments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."strain_likes" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "strainId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."strain_likes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."strain_mixers" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "recommendation" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "nugImage" "text" NOT NULL,
    "averageRating" double precision NOT NULL,
    "category" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "public"."strain_mixers" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."strains" (
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

ALTER TABLE "public"."strains" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "text" NOT NULL,
    "name" "text",
    "displayName" "text",
    "email" "text",
    "emailVerified" timestamp(3) without time zone,
    "image" "text",
    "aboutMe" "text",
    "birthDate" timestamp(3) without time zone,
    "languages" "text",
    "phone" "text",
    "location" "text" DEFAULT 'Earth'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "commentNotify" boolean DEFAULT true NOT NULL,
    "dispensaryNotify" boolean DEFAULT true NOT NULL
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."verification_tokens" (
    "id" "text" NOT NULL,
    "identifier" "text" NOT NULL,
    "token" "text" NOT NULL,
    "expires" timestamp(3) without time zone NOT NULL
);

ALTER TABLE "public"."verification_tokens" OWNER TO "postgres";

ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."dispensaries"
    ADD CONSTRAINT "dispensaries_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."dispensary_comment_likes"
    ADD CONSTRAINT "dispensary_comment_likes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."dispensary_comments"
    ADD CONSTRAINT "dispensary_comments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."dispensary_menus"
    ADD CONSTRAINT "dispensary_menus_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."dispensary_subscriptions"
    ADD CONSTRAINT "dispensary_subscriptions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."public_profiles"
    ADD CONSTRAINT "public_profiles_displayName_key" UNIQUE ("displayName");

ALTER TABLE ONLY "public"."public_profiles"
    ADD CONSTRAINT "public_profiles_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."public_strain_likes"
    ADD CONSTRAINT "public_strain_likes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."public_strains"
    ADD CONSTRAINT "public_strains_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."strain_comment_likes"
    ADD CONSTRAINT "strain_comment_likes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."strain_comments"
    ADD CONSTRAINT "strain_comments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."strain_likes"
    ADD CONSTRAINT "strain_likes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."strain_mixers"
    ADD CONSTRAINT "strain_mixers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."strains"
    ADD CONSTRAINT "strains_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."verification_tokens"
    ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id");

CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "public"."accounts" USING "btree" ("provider", "providerAccountId");

CREATE UNIQUE INDEX "dispensaries_slug_key" ON "public"."dispensaries" USING "btree" ("slug");

CREATE UNIQUE INDEX "public_strains_slug_idx" ON "public"."public_strains" USING "btree" ("slug");

CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "public"."sessions" USING "btree" ("sessionToken");

CREATE UNIQUE INDEX "strains_slug_key" ON "public"."strains" USING "btree" ("slug");

CREATE UNIQUE INDEX "users_displayName_key" ON "public"."users" USING "btree" ("displayName");

CREATE UNIQUE INDEX "users_email_key" ON "public"."users" USING "btree" ("email");

CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "public"."verification_tokens" USING "btree" ("identifier", "token");

CREATE UNIQUE INDEX "verification_tokens_token_key" ON "public"."verification_tokens" USING "btree" ("token");

CREATE OR REPLACE TRIGGER "insert_delete_update_likes_count" AFTER INSERT OR DELETE ON "public"."public_strain_likes" FOR EACH ROW EXECUTE FUNCTION "public"."update_likes_count"();

CREATE OR REPLACE TRIGGER "update_likes_count_after_delete" AFTER DELETE ON "public"."public_strain_likes" FOR EACH ROW EXECUTE FUNCTION "public"."update_likes_count"();

CREATE OR REPLACE TRIGGER "update_likes_count_after_insert" AFTER INSERT ON "public"."public_strain_likes" FOR EACH ROW EXECUTE FUNCTION "public"."update_likes_count"();

CREATE OR REPLACE TRIGGER "update_likes_count_trigger" AFTER UPDATE ON "public"."strains" FOR EACH ROW EXECUTE FUNCTION "public"."likes_count_trigger_function"();

ALTER TABLE ONLY "public"."accounts"
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."dispensary_comment_likes"
    ADD CONSTRAINT "dispensary_comment_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."dispensary_comments"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."dispensary_comment_likes"
    ADD CONSTRAINT "dispensary_comment_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."dispensary_comments"
    ADD CONSTRAINT "dispensary_comments_dispensaryId_fkey" FOREIGN KEY ("dispensaryId") REFERENCES "public"."dispensaries"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."dispensary_comments"
    ADD CONSTRAINT "dispensary_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."dispensary_menus"
    ADD CONSTRAINT "dispensary_menus_dispensaryId_fkey" FOREIGN KEY ("dispensaryId") REFERENCES "public"."dispensaries"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."dispensary_subscriptions"
    ADD CONSTRAINT "dispensary_subscriptions_dispensaryId_fkey" FOREIGN KEY ("dispensaryId") REFERENCES "public"."dispensaries"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."dispensary_subscriptions"
    ADD CONSTRAINT "dispensary_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."public_profiles"
    ADD CONSTRAINT "public_profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."public_strain_likes"
    ADD CONSTRAINT "public_strain_likes_strain_id_fkey" FOREIGN KEY ("strain_id") REFERENCES "public"."public_strains"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."public_strain_likes"
    ADD CONSTRAINT "public_strain_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_comment_likes"
    ADD CONSTRAINT "strain_comment_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."strain_comments"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_comment_likes"
    ADD CONSTRAINT "strain_comment_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_comments"
    ADD CONSTRAINT "strain_comments_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "public"."strains"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_comments"
    ADD CONSTRAINT "strain_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_likes"
    ADD CONSTRAINT "strain_likes_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "public"."strains"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."strain_likes"
    ADD CONSTRAINT "strain_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable delete for users based on user_id" ON "public"."public_profiles" FOR DELETE USING (("auth"."uid"() = "id"));

CREATE POLICY "Enable read access for all users" ON "public"."public_profiles" FOR SELECT USING (true);

CREATE POLICY "Enable update for users based on id" ON "public"."public_profiles" FOR UPDATE USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."likes_count_trigger_function"() TO "anon";
GRANT ALL ON FUNCTION "public"."likes_count_trigger_function"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."likes_count_trigger_function"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_likes_count"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_likes_count"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_likes_count"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_public_profiles"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_public_profiles"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_public_profiles"() TO "service_role";

GRANT ALL ON TABLE "public"."_prisma_migrations" TO "anon";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "service_role";

GRANT ALL ON TABLE "public"."accounts" TO "anon";
GRANT ALL ON TABLE "public"."accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."accounts" TO "service_role";

GRANT ALL ON TABLE "public"."dispensaries" TO "anon";
GRANT ALL ON TABLE "public"."dispensaries" TO "authenticated";
GRANT ALL ON TABLE "public"."dispensaries" TO "service_role";

GRANT ALL ON TABLE "public"."dispensary_comment_likes" TO "anon";
GRANT ALL ON TABLE "public"."dispensary_comment_likes" TO "authenticated";
GRANT ALL ON TABLE "public"."dispensary_comment_likes" TO "service_role";

GRANT ALL ON TABLE "public"."dispensary_comments" TO "anon";
GRANT ALL ON TABLE "public"."dispensary_comments" TO "authenticated";
GRANT ALL ON TABLE "public"."dispensary_comments" TO "service_role";

GRANT ALL ON TABLE "public"."dispensary_menus" TO "anon";
GRANT ALL ON TABLE "public"."dispensary_menus" TO "authenticated";
GRANT ALL ON TABLE "public"."dispensary_menus" TO "service_role";

GRANT ALL ON TABLE "public"."dispensary_subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."dispensary_subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."dispensary_subscriptions" TO "service_role";

GRANT ALL ON TABLE "public"."public_profiles" TO "anon";
GRANT ALL ON TABLE "public"."public_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."public_profiles" TO "service_role";
GRANT ALL ON TABLE "public"."public_profiles" TO "supabase_auth_admin";

GRANT ALL ON TABLE "public"."public_strain_likes" TO "anon";
GRANT ALL ON TABLE "public"."public_strain_likes" TO "authenticated";
GRANT ALL ON TABLE "public"."public_strain_likes" TO "service_role";

GRANT ALL ON TABLE "public"."public_strains" TO "anon";
GRANT ALL ON TABLE "public"."public_strains" TO "authenticated";
GRANT ALL ON TABLE "public"."public_strains" TO "service_role";

GRANT ALL ON TABLE "public"."sessions" TO "anon";
GRANT ALL ON TABLE "public"."sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."sessions" TO "service_role";

GRANT ALL ON TABLE "public"."strain_comment_likes" TO "anon";
GRANT ALL ON TABLE "public"."strain_comment_likes" TO "authenticated";
GRANT ALL ON TABLE "public"."strain_comment_likes" TO "service_role";

GRANT ALL ON TABLE "public"."strain_comments" TO "anon";
GRANT ALL ON TABLE "public"."strain_comments" TO "authenticated";
GRANT ALL ON TABLE "public"."strain_comments" TO "service_role";

GRANT ALL ON TABLE "public"."strain_likes" TO "anon";
GRANT ALL ON TABLE "public"."strain_likes" TO "authenticated";
GRANT ALL ON TABLE "public"."strain_likes" TO "service_role";

GRANT ALL ON TABLE "public"."strain_mixers" TO "anon";
GRANT ALL ON TABLE "public"."strain_mixers" TO "authenticated";
GRANT ALL ON TABLE "public"."strain_mixers" TO "service_role";

GRANT ALL ON TABLE "public"."strains" TO "anon";
GRANT ALL ON TABLE "public"."strains" TO "authenticated";
GRANT ALL ON TABLE "public"."strains" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON TABLE "public"."verification_tokens" TO "anon";
GRANT ALL ON TABLE "public"."verification_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."verification_tokens" TO "service_role";

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
