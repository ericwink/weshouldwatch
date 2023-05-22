import styles from "./genres.module.css";
import { Badge } from "@/components/ui/badge";

interface genreObject {
  id: number;
  name: string;
}

interface Props {
  genre_ids: genreObject[];
}

const Genres = ({ genre_ids }: Props) => {
  const genres = genre_ids.map(each => {
    return (
      <Badge
        data-testid="genre"
        key={each.name}
      >
        {each.name}
      </Badge>
    );
  });

  return <div className={styles.genreList}>{genres}</div>;
};

export default Genres;
