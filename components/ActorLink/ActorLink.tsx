import { Person } from "@/lib/interface";
import getPoster from "../../lib/getPoster";
import styles from "./actorLink.module.css";
import Link from "next/link";
import Image from "next/image";

const ActorLink = ({ profile_path, name, media_type, id, job, character }: Person) => {
  const actorImage = getPoster(profile_path, "200");
  const actorName = (name: string) => {
    if (name.length < 18) return name;
    const adjustedName = name.slice(0, 16);
    return `${adjustedName}...`;
  };

  return (
    <Link href={`/${media_type}/${id}`}>
      <Image
        src={actorImage}
        alt={name}
        height={300}
        width={200}
        className="rounded-md max-w-full h-auto"
      />
      <p className={styles.name}>{actorName(name)}</p>
      {character ? <p className={styles.name}>as {actorName(character)}</p> : null}
      {job ? <p className={styles.name}>{actorName(job)}</p> : null}
    </Link>
  );
};

export default ActorLink;
