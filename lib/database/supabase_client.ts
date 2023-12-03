import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database";

export const supabase = createClientComponentClient<Database>();