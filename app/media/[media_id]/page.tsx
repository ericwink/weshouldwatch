import MediaData from "@/components/MediaData";

interface Props {
  params: { media_id: string };
  searchParams: { media_type: string };
}

const fetchData = async (mediaType: string, id: string) => {
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${tmdbKey}&language=en-US`;
  const result = await fetch(url, { next: { revalidate: 28800 } });
  return result.json();
};

const mediaPage = async ({ params, searchParams }: Props) => {
  const { media_type } = searchParams;
  const { media_id } = params;

  const mediaData = await fetchData(media_type, media_id);

  return (
    <MediaData
      media_type={media_type}
      media_id={media_id}
      mediaData={mediaData}
    />
  );
};

export default mediaPage;
