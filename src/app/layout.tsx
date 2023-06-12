import "./globals.css";
import { MuiSetup } from "./theme/MuiSetup";
import NavBar from "../components/NavBar";
import UserProvider from "./context/user";

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
        <UserProvider>
          <NavBar />
          <MuiSetup>{children}</MuiSetup>
        </UserProvider>
      </body>
    </html>
  );
}