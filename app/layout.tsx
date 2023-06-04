import "./globals.css";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import { MuiSetup } from "./theme/MuiSetup";

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
        <SearchBar />
        <MuiSetup>{children}</MuiSetup>
      </body>
    </html>
  );
}
