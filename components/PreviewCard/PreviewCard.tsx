import findGenre from "../../utilities/findGenre";
import { Movie } from "@/utilities/interface";

const PreviewCard = ({ id, title, poster_path, release_date, vote_average, genre_ids, overview }: Movie) => {
  const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`;

  const releaseYear = release_date.slice(0, 4);
  const rating = vote_average.toFixed(1);
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
          <div className="flex item gap-4 justify-center">
            <p>{releaseYear}</p>
            <p>{`${rating}/10`}</p>
          </div>
        </div>
      </div>
      <p>{description(overview)}</p>
      {/* to be replaced with components later */}
      <div className="flex gap-8">
        <button
          onClick={() => console.log("add to whatever clicked")}
          className="button"
        >
          Add To List
        </button>
        <button className="button">View Details</button>
      </div>
    </article>
  );
};

export default PreviewCard;
