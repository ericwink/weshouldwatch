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
  authModal: React.ReactNode;
}

export default function RootLayout({ children, authModal }: Props) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <NavBar />
          <MuiSetup>
            {children}
            {authModal}
          </MuiSetup>
        </TanstackProvider>
      </body>
    </html>
  );
}
