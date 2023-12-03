import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database";
import { cookies } from "next/headers";

const cookieStore = cookies();
export const supabase = createServerComponentClient<Database>({
  cookies: () => cookieStore,
});