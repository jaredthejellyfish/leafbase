import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../database";
import type { StrainLike } from "../types";

export default async function getServerLikes(
  supabase: SupabaseClient<Database>,
  session?: Session,
) {
  try {
    if (!session) {
      return { likes: null, error: "No session" };
    }
    const { data: strainLikes, error: strainLikesError } = await supabase
      .from("strain_likes")
      .select(
        `
    id, created_at,
    strain_id (
      name,
      nugImage,
      slug,
      id
    )
  `,
      )
      .eq("user_id", session?.user.id)
      .returns<StrainLike[]>();

    if (strainLikesError) return { likes: null, error: strainLikesError };
    return { likes: strainLikes, error: null };
  } catch (error) {
    return { likes: null, error };
  }
}
