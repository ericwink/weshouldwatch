import Link from "next/link";
import { Movie, TV } from "@/lib/interface";
import getPoster from "@/lib/getPoster";
import Image from "next/image";

interface Props {
  media: Movie | TV;
}

const PosterLink = ({ media }: Props) => {
  const { poster_path, id, media_type } = media;
  const mediaTitle = media.title ? media.title : media.name;

  return (
    <Link href={`/media/${id}/?media_type=${media_type}`}>
      <Image
        src={getPoster(poster_path, "200")}
        alt={`poster for ${mediaTitle}`}
        className="rounded-md max-w-full h-auto"
        height={300}
        width={200}
      />
    </Link>
  );
};

export default PosterLink;
