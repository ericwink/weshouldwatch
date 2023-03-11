function getPoster(poster_path: string, size: string): string {
  return `https://image.tmdb.org/t/p/w${size}/${poster_path}`;
}

export default getPoster;
