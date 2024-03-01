import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../database";

export default async function getServerUserProfile() {
  try {
    const cookieStore = cookies();

    const supabase = createServerComponentClient<Database>({
      cookies: () => cookieStore,
    });
    
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
