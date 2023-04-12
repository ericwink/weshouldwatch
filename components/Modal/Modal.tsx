import { ReactNode } from "react";
import style from "./modal.module.css";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
}

const Modal = ({ children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={style.modalBackground}
      role="backdrop"
    >
      <div
        className={style.modalContent}
        onClick={e => e.stopPropagation}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
