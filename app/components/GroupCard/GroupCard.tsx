import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { RxPerson } from "react-icons/rx";
import { GrMultimedia, GrCircleInformation } from "react-icons/gr";
import { FcInvite } from "react-icons/fc";
import { Collection, GroupInfo } from "@/lib/interface";
import ModalTwo from "../Modal/ModalTwo";
import InviteForm from "../InviteForm/InviteForm";
import Link from "next/link";

const GroupCard = ({ id, name, userIDs, collection }: GroupInfo) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Consider a group description?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center">
          <RxPerson />
          <p>Total Members: {userIDs.length}</p>
        </div>
        <div className="flex gap-2 items-center">
          <GrMultimedia />
          <p>Media in collection: {collection.length}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <div className="flex gap-4 items-center">
          <ModalTwo
            icon={<FcInvite />}
            text="Invite"
            title="Invite Someone"
            description="Send an email to ask someone to join your group!"
          >
            <InviteForm groupID={id} />
          </ModalTwo>
        </div>
        <Link
          className="flex gap-2 items-center"
          href={`/mygroups/${id}`}
        >
          <GrCircleInformation />
          <p>see details</p>
        </Link>
        <p>another option?</p>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
