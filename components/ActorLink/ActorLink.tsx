import { Person } from "@/utilities/interface";
import getPoster from "../../utilities/getPoster";
import styles from "./actorLink.module.css";

const ActorLink = ({ profile_path, name, media_type, id }: Person) => {
  const actorImage = getPoster(profile_path, "200");
  const actorName = (name: string) => {
    if (name.length < 18) return name;
    const adjustedName = name.slice(0, 16);
    return `${adjustedName}...`;
  };

  return (
    <a
      className={styles.button}
      href={`/${media_type}/${id}`}
    >
      <img
        src={actorImage}
        alt={name}
        className={styles.img}
      />
      <p className={styles.name}>{actorName(name)}</p>
    </a>
  );
};

export default ActorLink;
