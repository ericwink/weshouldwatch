import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const GroupLayout = ({ children }: Props) => {
  return (
    <section>
      <nav>
        <Link href="/movies">Movies</Link>
        <Link href="tv">TV</Link>
        <Link href="info">Group Info</Link>
      </nav>
      {children}
    </section>
  );
};

export default GroupLayout;
