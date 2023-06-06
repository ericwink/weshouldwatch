import "./globals.css";
import SearchBar from "@/app/components/SearchBar";
import { MuiSetup } from "./theme/MuiSetup";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "We Should Watch...",
  description: "An app to track media together!",
  keywords: "movies, tv, media, watch, together, track, list, collection",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        {/* <SearchBar /> */}
        <NavBar />
        <MuiSetup>{children}</MuiSetup>
      </body>
    </html>
  );
}
