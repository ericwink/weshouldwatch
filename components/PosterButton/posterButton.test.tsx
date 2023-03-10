import { screen, render } from "@testing-library/react";
import PosterButton from "./PosterButton";

const movieInfo = {
  adult: false,
  backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
  id: 505642,
  title: "Black Panther: Wakanda Forever",
  original_language: "en",
  original_title: "Black Panther: Wakanda Forever",
  overview:
    "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
  poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
  media_type: "movie",
  genre_ids: [28, 12, 878],
  popularity: 3095.305,
  release_date: "2022-11-09",
  video: false,
  vote_average: 7.347,
  vote_count: 3904,
};

describe("Poster Button", () => {
  it("Should render the movie image", () => {
    render(<PosterButton {...movieInfo} />);
    const image = screen.getByAltText("Black Panther: Wakanda Forever");
    expect(image).toBeVisible();
  });
  it("should display the button with movie title", () => {
    render(<PosterButton {...movieInfo} />);
    const button = screen.getByRole("button");
    const title = screen.getByText("Black Panther: Wakanda Forever");
    expect(button).toBeVisible();
    expect(title).toBeVisible();
  });
});
