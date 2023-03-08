import findGenre from "../../utilities/findGenre";

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

  const genres = genre_ids.map(each => {
    return (
      <p
        data-testid="genre"
        key={each}
        className="genre"
      >
        {findGenre(each)}
      </p>
    );
  });

  return (
    <article className="flex flex-col gap-4 mx-auto p-6 border rounded-xl bg-slate-400 max-w-xs shadow-lg items-center">
      <div className="flex gap-4">
        <img
          src={poster}
          alt={title}
          className="h-40 w-40"
        />

        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-medium text-center">{title}</h1>
          <div className="flex flex-wrap gap-2 justify-center">{genres}</div>
          <div className="flex gap-4">
            <p>{release_date}</p>
            <p>{vote_average}</p>
          </div>
        </div>
      </div>
      <p>{description(overview)}</p>
      {/* to be replaced with components later */}
      <div className="flex gap-8">
        <button className="button">Add To List</button>
        <button className="button">View Details</button>
      </div>
    </article>
  );
};

export default PreviewCard;
