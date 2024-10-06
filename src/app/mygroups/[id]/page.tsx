import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const GroupPage = ({ params }: Props) => {
  redirect(`/mygroups/${params.id}/movie?watched=false`);
};

export default GroupPage;
