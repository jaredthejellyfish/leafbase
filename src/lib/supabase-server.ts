import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "./database/database";

const cookieStore = cookies();

const supabase = createServerComponentClient<Database>({
  cookies: () => cookieStore,
});

export default supabase;
