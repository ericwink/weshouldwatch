import Trending from "@/app/components/Trending/Trending";
import SignIn from "./components/SignIn/SignIn";

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

      <SignIn />
    </main>
  );
};

export default HomePage;
