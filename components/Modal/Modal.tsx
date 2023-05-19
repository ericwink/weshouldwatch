"use client";

import { ReactNode } from "react";
import style from "./modal.module.css";
import useModal from "./useModal";
import styles from "./modal.module.css";

interface Props {
  children: ReactNode;
  buttonText: string;
  icon: ReactNode;
}

const Modal = ({ children, buttonText, icon }: Props) => {
  const { closeModal, isOpen, openModal } = useModal();

  const showModal = (
    <div
      onClick={closeModal}
      className={style.modalBackground}
      role="backdrop"
    >
      <div
        className={style.modalContent}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={style.button}
          onClick={closeModal}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <button
        className={styles.openButton}
        onClick={openModal}
      >
        {icon}
        {buttonText}
      </button>

      {isOpen && showModal}
    </>
  );
};

export default Modal;
