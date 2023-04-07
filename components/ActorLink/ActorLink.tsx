import { Person } from "@/utilities/interface";
import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import getPoster from "../../utilities/getPoster";
import styles from "./actorLink.module.css";

const ActorLink = ({ profile_path, name, media_type, id, job, character }: Person) => {
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
      {character ? <p className={styles.name}>as {actorName(character)}</p> : null}
      {job ? <p className={styles.name}>{actorName(job)}</p> : null}
    </a>
  );
};

export default ActorLink;
