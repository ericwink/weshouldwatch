import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const GroupPage = ({ params }: Props) => {
  redirect(`/mygroups/${params.id}/movies?watched=false`);
};

export default GroupPage;
