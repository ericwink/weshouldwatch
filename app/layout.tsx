import SearchBar from "@/app/components/SearchBar/SearchBar";
import SProvider from "./components/SessionProvider/SProvider";

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
        <SProvider>{children}</SProvider>
      </body>
    </html>
  );
}
