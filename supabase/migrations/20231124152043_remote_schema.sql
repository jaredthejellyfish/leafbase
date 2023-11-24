create extension if not exists "pg_cron" with schema "public" version '1.4-1';

create extension if not exists "vector" with schema "public" version '0.4.0';

drop trigger if exists "update_likes_count_trigger" on "public"."backup_strains";

drop trigger if exists "insert_delete_update_likes_count" on "public"."strain_likes";

drop trigger if exists "update_likes_count_after_delete" on "public"."strain_likes";

drop trigger if exists "update_likes_count_after_insert" on "public"."strain_likes";

alter table "public"."strain_comments" drop constraint "strain_comments_user_id_fkey";

drop function if exists "public"."likes_count_trigger_function"();

drop function if exists "public"."update_likes_count"();

create table "public"."long_pairings" (
    "id" uuid not null default gen_random_uuid(),
    "strain1_id" uuid not null,
    "strain2_id" uuid not null,
    "body" text,
    "created_at" timestamp with time zone not null default now(),
    "image" text,
    "strain2_slug" text not null,
    "strain2_name" text not null
);


create table "public"."short_pairings" (
    "id" uuid not null default gen_random_uuid(),
    "strain1_id" uuid not null,
    "strain2_id" uuid not null,
    "body" text,
    "created_at" timestamp with time zone not null default now(),
    "image" text,
    "strain2_slug" text not null,
    "strain2_name" text not null
);


create table "public"."strains_vectors" (
    "slug" text not null,
    "vector" vector not null,
    "id" uuid not null default gen_random_uuid(),
    "strain_id" uuid not null
);


alter table "public"."profiles" add column "profile_id" uuid not null default gen_random_uuid();

alter table "public"."strains" alter column "name" set not null;

alter table "public"."strains" alter column "subtitle" set not null;

CREATE UNIQUE INDEX long_pairings_pkey ON public.long_pairings USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (profile_id);

CREATE UNIQUE INDEX profiles_profile_id_key ON public.profiles USING btree (profile_id);

CREATE UNIQUE INDEX short_pairings_pkey ON public.short_pairings USING btree (id);

CREATE UNIQUE INDEX strains_vectors_pkey ON public.strains_vectors USING btree (id);

alter table "public"."long_pairings" add constraint "long_pairings_pkey" PRIMARY KEY using index "long_pairings_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."short_pairings" add constraint "short_pairings_pkey" PRIMARY KEY using index "short_pairings_pkey";

alter table "public"."strains_vectors" add constraint "strains_vectors_pkey" PRIMARY KEY using index "strains_vectors_pkey";

alter table "public"."long_pairings" add constraint "long_pairings_strain1_id_fkey" FOREIGN KEY (strain1_id) REFERENCES strains(id) not valid;

alter table "public"."long_pairings" validate constraint "long_pairings_strain1_id_fkey";

alter table "public"."long_pairings" add constraint "long_pairings_strain2_id_fkey" FOREIGN KEY (strain2_id) REFERENCES strains(id) not valid;

alter table "public"."long_pairings" validate constraint "long_pairings_strain2_id_fkey";

alter table "public"."profiles" add constraint "profiles_profile_id_key" UNIQUE using index "profiles_profile_id_key";

alter table "public"."short_pairings" add constraint "short_pairings_strain1_id_fkey" FOREIGN KEY (strain1_id) REFERENCES strains(id) not valid;

alter table "public"."short_pairings" validate constraint "short_pairings_strain1_id_fkey";

alter table "public"."short_pairings" add constraint "short_pairings_strain2_id_fkey" FOREIGN KEY (strain2_id) REFERENCES strains(id) not valid;

alter table "public"."short_pairings" validate constraint "short_pairings_strain2_id_fkey";

alter table "public"."strains_vectors" add constraint "strains_vectors_strain_id_fkey" FOREIGN KEY (strain_id) REFERENCES strains(id) ON DELETE CASCADE not valid;

alter table "public"."strains_vectors" validate constraint "strains_vectors_strain_id_fkey";

alter table "public"."strain_comments" add constraint "strain_comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."strain_comments" validate constraint "strain_comments_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.decrement_like_count()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.strains
  SET likes_count = likes_count - 1
  WHERE id = OLD.strain_id;
  RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.find_closest_strains(input_slug text, limit_count integer)
 RETURNS TABLE(id uuid, slug text, strain_id uuid, nug_image text)
 LANGUAGE plpgsql
AS $function$
DECLARE
    input_vector public.vector; -- Variable to store the vector of the input slug
BEGIN
    -- Retrieve the vector for the input slug
    SELECT sv.vector INTO input_vector 
    FROM public.strains_vectors sv
    WHERE sv.slug = input_slug; -- Qualify the column reference with table alias

    -- Check if input_vector is not found, then return an empty result
    IF input_vector IS NULL THEN
        RETURN;
    END IF;

    -- Return the closest strains by using the vector similarity operator
    RETURN QUERY
    SELECT
        sv.id,
        sv.slug,
        s.id AS strain_id,
        s."nugImage" AS nug_image
    FROM
        public.strains_vectors sv
    JOIN
        public.strains s ON sv.strain_id = s.id
    WHERE 
        sv.slug <> input_slug -- Exclude the input slug
    ORDER BY
        sv.vector <-> input_vector -- Order by vector similarity
    LIMIT 
        limit_count; -- Limit the number of results
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_related_strains(input_slug text, limit_count integer)
 RETURNS TABLE(id integer, slug text, strain_id integer, image text)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT sv.id, sv.slug, s.id AS strain_id, s.image
  FROM public.strains_vectors sv
  JOIN public.strains s ON sv.strain_id = s.id -- Join to fetch strain's id and image
  JOIN (
    SELECT sv2.vector, sv2.strain_id
    FROM public.strains_vectors sv2
    WHERE sv2.slug = input_slug
  ) record ON true
  WHERE sv.slug <> input_slug -- Exclude the original record
  LIMIT limit_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_like_count()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.strains
  SET likes_count = likes_count + 1
  WHERE id = NEW.strain_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_nugimage()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Select the "nugImage" from the public.strains table and assign it to the "image" column of the new row
    -- Make sure to use the correct case and quote the column name if it was created with quotes
    NEW.image := (SELECT "nugImage" FROM public.strains WHERE id = NEW.strain1_id);
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.search_strains(search_term text, limit_num integer)
 RETURNS TABLE(slug text, name text, nugimage text)
 LANGUAGE plpgsql
AS $function$DECLARE
  row_count int;
BEGIN
  RETURN QUERY 
  SELECT s.slug, s.name, s."nugImage"
  FROM public.strains s
  WHERE lower(s.name) = lower(search_term) 
  LIMIT limit_num;

  GET DIAGNOSTICS row_count = ROW_COUNT;
  
  IF row_count = 0 THEN
    RETURN QUERY 
    SELECT s.slug, s.name, s."nugImage"
    FROM public.strains s
    WHERE s.name &@~ search_term 
    LIMIT limit_num;
  END IF;
END;
$function$
;

create policy "all users can see likes"
on "public"."strain_likes"
as permissive
for select
to authenticated
using (true);


CREATE TRIGGER after_like_delete AFTER DELETE ON public.strain_likes FOR EACH ROW EXECUTE FUNCTION decrement_like_count();

CREATE TRIGGER after_like_insert AFTER INSERT ON public.strain_likes FOR EACH ROW EXECUTE FUNCTION increment_like_count();


