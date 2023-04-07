function getPoster(poster_path: string, size: string): string {
  if (!poster_path) return "/nopicture.png";
  return `https://image.tmdb.org/t/p/w${size}/${poster_path}`;
}

export default getPoster;
