import supabase from "../supabase-server";

export default async function getServerUserProfile() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error ?? !session) {
      return { user: null, error };
    }

    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, image")
      .eq("id", session.user.id)
      .single();

    if (profileError) {
      return { user: null, error: profileError };
    }

    return { user: data, error };
  } catch (error) {
    return { user: null, error };
  }
}
