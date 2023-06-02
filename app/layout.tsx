import "./globals.css";
import SProvider from "../components/SessionProvider/SProvider";
import { Toasty } from "../components/Toasty/Toasty";
import SearchBar from "@/components/SearchBar/SearchBar";
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
        <Toasty />
        <SProvider>
          <MuiSetup>{children}</MuiSetup>
        </SProvider>
      </body>
    </html>
  );
}
