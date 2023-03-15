import { screen, render } from "@testing-library/react";
import ActorButton from "./ActorLink";

const actorInfo = {
  adult: false,
  gender: 1,
  id: 974169,
  known_for_department: "Acting",
  known_for: null,
  media_type: "person",
  name: "Jenna Ortega",
  original_name: "Jenna Ortega",
  popularity: 174.025,
  profile_path: "/jmLhlMCHgqlHIlneIPpcckpkzaz.jpg",
};

describe("Actor Button", () => {
  it("should display the image of the actor", () => {
    render(<ActorButton {...actorInfo} />);
    const image = screen.getByAltText("Jenna Ortega");
    expect(image).toBeVisible();
  });
  it("should display the name of the actor", () => {
    render(<ActorButton {...actorInfo} />);
    const image = screen.getByText("Jenna Ortega");
    expect(image).toBeVisible();
  });
});
