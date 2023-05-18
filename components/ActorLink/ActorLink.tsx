import { Person } from "@/lib/interface";
import getPoster from "../../lib/getPoster";
import styles from "./actorLink.module.css";
import Link from "next/link";

const ActorLink = ({ profile_path, name, media_type, id, job, character }: Person) => {
  const actorImage = getPoster(profile_path, "200");
  const actorName = (name: string) => {
    if (name.length < 18) return name;
    const adjustedName = name.slice(0, 16);
    return `${adjustedName}...`;
  };

  return (
    <li>
      <Link
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
      </Link>
    </li>
  );
};

export default ActorLink;
