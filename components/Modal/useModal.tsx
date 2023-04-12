import { useState } from "react";

interface UseModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): UseModal => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return { isOpen, openModal, closeModal };
};

export default useModal;
