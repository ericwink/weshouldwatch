import findGenre from "../../utilities/findGenre";
import { Movie, TV } from "@/utilities/interface";
import styles from "./previewCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const PreviewCard = ({ id, title, name, poster_path, release_date, first_air_date, vote_average, genre_ids, overview }: Movie | TV) => {
  const add = <FontAwesomeIcon icon={faCirclePlus} />;
  const info = <FontAwesomeIcon icon={faCircleInfo} />;

  const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`;

  const releaseYear = release_date ? release_date.slice(0, 4) : first_air_date.slice(0, 4);
  const mediaTitle = title ? title : name;

  const rating = `${Math.floor(vote_average * 10)}%`;
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
      <h1 className={styles.title}>{mediaTitle}</h1>

      <div className={styles.mainInfo}>
        <img
          src={poster}
          alt={mediaTitle}
          className={styles.poster}
        />
        <div className={styles.subInfo}>
          <p>{description(overview)}</p>
          <div className={styles.yearRating}>
            <p>{releaseYear}</p>
            <p>{rating}</p>
          </div>
        </div>
      </div>

      <div className={styles.genreList}>{genres}</div>

      {/* to be replaced with components later */}
      <div className={styles.buttons}>
        <button className={styles.button}>{add}Add To List</button>
        <button className={styles.button}>{info}View Details</button>
      </div>
    </div>
  );
};

export default PreviewCard;
