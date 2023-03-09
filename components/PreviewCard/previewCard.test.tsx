import { screen, render, findByText, getByTestId } from "@testing-library/react";
import PreviewCard from "./PreviewCard";

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

describe("Preview Card", () => {
  it("Should display the passed-in title", () => {
    render(<PreviewCard {...movieInfo} />);
    const title = screen.getByText("Black Panther: Wakanda Forever");
    expect(title).toBeVisible();
  });

  it("should display the poster", () => {
    render(<PreviewCard {...movieInfo} />);
    const poster = screen.getByRole("img", { name: "Black Panther: Wakanda Forever" });
    expect(poster).toBeVisible();
  });

  it("should display the correct amount of genres", () => {
    render(<PreviewCard {...movieInfo} />);
    const genres = screen.getAllByTestId("genre");
    expect(genres).toHaveLength(3);
  });

  it("should display the genres by name", () => {
    render(<PreviewCard {...movieInfo} />);
    const action = screen.getByText("Action");
    const adventure = screen.getByText("Adventure");
    const sciFi = screen.getByText("Science Fiction");
    expect(action).toBeVisible();
    expect(adventure).toBeVisible();
    expect(sciFi).toBeVisible();
  });

  it("should display the description, maximum of 20 words", () => {
    render(<PreviewCard {...movieInfo} />);
    const description = screen.getByText("Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the...");
    expect(description).toBeVisible();
  });

  it("should display the 'add to list' button and the 'view details' button", () => {
    render(<PreviewCard {...movieInfo} />);
    const addToList = screen.getByRole("button", { name: "Add To List" });
    const viewDetails = screen.getByRole("button", { name: "View Details" });
    expect(addToList).toBeVisible();
    expect(viewDetails).toBeVisible();
  });

  it("should display the year only of the release date", () => {
    render(<PreviewCard {...movieInfo} />);
    const year = screen.getByText("2022");
    expect(year).toBeVisible();
  });

  it("should display the rating rounded to the tenth decimial out of ten", () => {
    render(<PreviewCard {...movieInfo} />);
    const rating = screen.getByText("7.3/10");
    expect(rating).toBeVisible();
  });
});
