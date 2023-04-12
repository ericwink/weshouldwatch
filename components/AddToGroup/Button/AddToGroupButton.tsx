import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import style from "./addToGroup.module.css";
import Modal from "../../Modal/Modal";
import useModal from "../../Modal/useModal";
import AddToGroupSelect from "../Selection/AddToGroupSelect";

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
      <AddToGroupSelect mediaInfo={mediaInfo} />
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
