export async function getWhatToOrder() {
  const res = await fetch(`/api/generate/what-to-order`);
  const data = (await res.json()) as { order: string };

  return data.order;
}
