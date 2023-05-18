import { Movie, TV } from "@/lib/interface";
import styles from "./previewCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Genres from "../../components/Genres/Genres";
import Modal from "@/components/Modal/Modal";
import GroupContainer from "@/components/GroupContainer/GroupContainer";
import { FaPlusCircle } from "react-icons/fa";

const PreviewCard = ({ id, title, name, poster_path, release_date, first_air_date, vote_average, genre_ids, overview, media_type }: Movie | TV) => {
  const info = <FontAwesomeIcon icon={faCircleInfo} />;

  const poster = `https://image.tmdb.org/t/p/w200/${poster_path}`;

  const releaseYear = release_date ? release_date.slice(0, 4) : first_air_date.slice(0, 4);
  const mediaTitle = title ? title : name;

  const mediaInfo = {
    id: id.toString(),
    title: mediaTitle,
    poster_path: poster_path,
  };

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

      <Genres
        genre_ids={genre_ids}
        type="nums"
      />

      {/* to be replaced with components later */}
      <div className={styles.buttons}>
        <Modal
          icon={<FaPlusCircle />}
          buttonText="Add To Group"
        >
          <GroupContainer mediaInfo={mediaInfo} />
        </Modal>
        <a
          href={`/media/${id}/?media_type=${media_type}`}
          className={styles.button}
        >
          {info}View Details
        </a>
      </div>
    </div>
  );
};

export default PreviewCard;
