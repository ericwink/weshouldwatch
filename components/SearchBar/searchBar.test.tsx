import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

const user = userEvent.setup();

describe("Search Bar", () => {
  it("should display the search bar", () => {
    render(<SearchBar />);
    const searchbar = screen.getByRole("textbox");
    expect(searchbar).toBeVisible();
  });

  it("should have the placeholder text", () => {
    render(<SearchBar />);
    const searchbar = screen.getByPlaceholderText("Search Movies, TV, or People...");
    expect(searchbar).toBeVisible();
  });

  it("should update state value when user types", async () => {
    render(<SearchBar />);
    const searchbar = screen.getByRole("textbox");
    await user.type(searchbar, "Hello World");
    expect(searchbar).toHaveValue("Hello World");
  });

  it("form action should update to correct url based on user entry", async () => {
    render(<SearchBar />);
    const form = screen.getByRole("form");
    const searchbar = screen.getByRole("textbox");
    await user.type(searchbar, "Shazam");
    expect(form).toHaveAttribute("action", "/search/Shazam");
  });
});
