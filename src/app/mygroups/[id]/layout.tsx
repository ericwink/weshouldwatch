import Link from "next/link";

interface Props {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

const GroupLayout = ({ children, params }: Props) => {
  return (
    <section>
      <nav>
        <Link href={`/mygroups/${params.id}/movies`}>Movies</Link>
        <Link href={`/mygroups/${params.id}/tv`}>TV</Link>
        <Link href={`/mygroups/${params.id}/info`}>Group Info</Link>
      </nav>
      {children}
    </section>
  );
};

export default GroupLayout;
