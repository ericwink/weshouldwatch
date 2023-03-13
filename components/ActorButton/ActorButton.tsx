import { Person } from "@/utilities/interface";
import getPoster from "../../utilities/getPoster";
import styles from "./actorButton.module.css";

const ActorButton = ({ profile_path, name }: Person) => {
  const actorImage = getPoster(profile_path, "200");

  return (
    <a
      className={styles.button}
      href="/actor/id"
    >
      <img
        src={actorImage}
        alt={name}
        className={styles.img}
      />
      <p>{name}</p>
    </a>
  );
};

export default ActorButton;
