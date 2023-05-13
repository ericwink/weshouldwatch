"use client";

import { Movie, TV } from "@/utilities/interface";
import { PropsWithChildren } from "react";
import getPoster from "../../utilities/getPoster";
import style from "./PosterButton.module.css";
import useModal from "../../app/components/Modal/useModal";
import Modal from "../../app/components/Modal/Modal";

const PosterButton = ({ poster_path, title, name, children, id, media_type }: PropsWithChildren<Movie | TV>) => {
  const { isOpen, openModal, closeModal } = useModal();
  const mediaTitle = title ? title : name;

  const modal = (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
    >
      {children}
    </Modal>
  );

  if (children) {
    return (
      <>
        <button
          className={style.button}
          onClick={openModal}
        >
          <img
            src={getPoster(poster_path, "200")}
            alt={mediaTitle}
            className={style.poster}
          />
        </button>

        {isOpen ? modal : null}
      </>
    );
  }

  if (!children) {
    return (
      <a href={`/media/${id}/?media_type=${media_type}`}>
        <img
          src={getPoster(poster_path, "200")}
          alt={mediaTitle}
          className={style.button}
        />
      </a>
    );
  }
};

export default PosterButton;
