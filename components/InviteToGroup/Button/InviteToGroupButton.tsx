import Modal from "../../Modal/Modal";
import useModal from "../../Modal/useModal";
import InviteForm from "../InviteForm/InviteForm";

const InviteToGroupButton = () => {
  const { closeModal, isOpen, openModal } = useModal();

  const modal = (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
    >
      <InviteForm />
    </Modal>
  );

  return (
    <>
      <button onClick={openModal}>Invite To A Group</button>

      {isOpen ? modal : null}
    </>
  );
};

export default InviteToGroupButton;