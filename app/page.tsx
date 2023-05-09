import Trending from "@/app/components/Trending/Trending";

const HomePage = () => {
  return (
    <main>
      <h1>Home Page</h1>

      <p>Trending Movies</p>
      <Trending mediaType="movie" />
      <p>Trending TV</p>
      <Trending mediaType="tv" />
      <p>Trending People</p>
      <Trending mediaType="person" />
    </main>
  );
};

export default HomePage;
