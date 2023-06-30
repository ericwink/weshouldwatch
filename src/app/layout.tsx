import "./globals.css";
import { MuiSetup } from "../context/theme/MuiSetup";
import NavBar from "../components/NavBar";
import TanstackProvider from "../context/tanstack";

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
        <TanstackProvider>
          <NavBar />
          <MuiSetup>{children}</MuiSetup>
        </TanstackProvider>
      </body>
    </html>
  );
}
