import { Movie, TV } from "@/utilities/interface";
import { PropsWithChildren, useState } from "react";
import getPoster from "../../utilities/getPoster";
import style from "./PosterButton.module.css";

const PosterButton = ({ poster_path, title, name, children }: PropsWithChildren<Movie | TV>) => {
  const [childVisible, setChildVisible] = useState(false);
  const mediaTitle = title ? title : name;
  const handleClick = (e: any) => {
    if (e.target.alt === mediaTitle || e.target.role === "backdrop") {
      setChildVisible(prev => !prev);
    }
  };

  const modal = (
    <div
      onClick={handleClick}
      className={style.modalBackground}
      role="backdrop"
    >
      <div
        role="dialog"
        aria-modal={childVisible}
      >
        {children}
      </div>
    </div>
  );

  return (
    <>
      <button onClick={handleClick}>
        <img
          src={getPoster(poster_path, "200")}
          alt={mediaTitle}
          className={style.button}
        />
      </button>

      {childVisible ? modal : null}
    </>
  );
};

export default PosterButton;
