import { env } from "@/env";

export async function getStrainsSSG() {
  const res = await fetch(
    "https://euwnyenhzhztqztezjdn.supabase.co/rest/v1/strains?select=slug",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    }
  );

  const data = (await res.json()) as { slug: string }[];

  return data.map((strain) => strain.slug);
}