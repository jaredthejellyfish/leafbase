export function isLiked(id: string, likes?: string[]) {
  return likes?.includes(id) || false;
}
