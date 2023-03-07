interface MediaProps {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const PreviewCard = ({ id, title, poster_path, release_date, vote_average, genre_ids, overview }: MediaProps) => {
  const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`;

  const description = (text: string) => {
    let string = "";
    let array = text.split(" ");
    for (let i = 0; i < 20; i++) {
      string = string + " " + array[i];
    }
    return `${string}...`;
  };

  return (
    <>
      <h1>{title}</h1>
      <img
        src={poster}
        alt={title}
      />
      <p>{release_date}</p>
      <p>{vote_average}</p>

      {genre_ids.map(each => {
        return <p data-testid="genre">{each}</p>;
      })}

      <p>{description(overview)}</p>

      {/* to be replaced with components later */}
      <button>Add To List</button>
      <button>View Details</button>
    </>
  );
};

export default PreviewCard;
