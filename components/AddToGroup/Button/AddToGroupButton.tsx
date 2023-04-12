import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import style from "./addToGroup.module.css";
import Modal from "../../Modal/Modal";
import useModal from "../../Modal/useModal";
import AddToGroupContainer from "../Container/AddToGroupContainer";

interface Props {
  mediaInfo: {
    id: string;
    title: string;
    poster_path: string;
  };
}

const AddToGroupButton = ({ mediaInfo }: Props) => {
  const add = <FontAwesomeIcon icon={faCirclePlus} />;
  const { closeModal, isOpen, openModal } = useModal();

  const modal = (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
    >
      <AddToGroupContainer mediaInfo={mediaInfo} />
    </Modal>
  );

  return (
    <>
      <button
        className={style.button}
        onClick={openModal}
      >
        {add}Add To Group
      </button>

      {isOpen ? modal : null}
    </>
  );
};

export default AddToGroupButton;
