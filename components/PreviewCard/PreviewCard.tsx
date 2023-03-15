import findGenre from "../../utilities/findGenre";
import { Movie, TV } from "@/utilities/interface";
import styles from "./previewCard.module.css";

const PreviewCard = ({ id, title, name, poster_path, release_date, first_air_date, vote_average, genre_ids, overview }: Movie | TV) => {
  const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`;

  const releaseYear = release_date ? release_date.slice(0, 4) : first_air_date.slice(0, 4);
  const mediaTitle = title ? title : name;

  const rating = vote_average.toFixed(1);
  const description = (text: string) => {
    let string = "";
    let array = text.split(" ");
    if (array.length < 20) return text;
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
        className={styles.genre}
      >
        {findGenre(each)}
      </p>
    );
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={styles.card}
    >
      <div className={styles.mainInfo}>
        <img
          src={poster}
          alt={mediaTitle}
          className={styles.poster}
        />
        <div className={styles.titleAndYear}>
          <h1 className={styles.title}>{mediaTitle}</h1>

          <div className={styles.yearRating}>
            <p>{releaseYear}</p>
            <p>{`${rating}/10`}</p>
          </div>
        </div>
      </div>

      <div className={styles.genreList}>{genres}</div>

      <p>{description(overview)}</p>
      {/* to be replaced with components later */}
      <div className={styles.buttons}>
        <button onClick={() => console.log("add to whatever clicked")}>Add To List</button>
        <button>View Details</button>
      </div>
    </div>
  );
};

export default PreviewCard;
