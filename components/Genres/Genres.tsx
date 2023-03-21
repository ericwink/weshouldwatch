import findGenre from "@/utilities/findGenre";
import styles from "./genres.module.css";

interface genreObject {
  id: number;
  name: string;
}

interface Props {
  genre_ids: number[] | genreObject[];
  type: "nums" | "obj";
}

const Genres = ({ genre_ids, type }: Props) => {
  const genres = genre_ids.map(each => {
    return (
      <p
        data-testid="genre"
        key={each}
        className={styles.genre}
      >
        {type === "nums" ? findGenre(each) : each.name}
      </p>
    );
  });

  return <div className={styles.genreList}>{genres}</div>;
};

export default Genres;
