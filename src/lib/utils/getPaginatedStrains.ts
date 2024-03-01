import supabase from "../supabase-server";
import type { Strain } from "../types";

export async function getPaginatedStrains(
  filter: "re" | "az" | "za" | "sr",
  page: number,
) {
  const nameFilter = filter === "za" ? false : true;

  const orderByLikes = filter && filter !== "re" ? false : true;

  const limit = 12;
  const from = (page - 1) * limit;
  const to = from + limit;

  let query = supabase
    .from("strains")
    .select("*", { count: "estimated", head: false });

  if (orderByLikes) {
    query = query.order("likes_count", { ascending: false });
  }

  query = query.order("name", { ascending: nameFilter }).range(from, to);

  const { data: strains, error, count } = await query.returns<Strain[]>();

  return { strains, count, error };
}