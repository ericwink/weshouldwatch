import { Movie, TV } from "@/utilities/interface";
import { PropsWithChildren, useState } from "react";
import getPoster from "../../utilities/getPoster";
import style from "./PosterButton.module.css";

const PosterButton = ({ poster_path, title, name, children, id, media_type }: PropsWithChildren<Movie | TV>) => {
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
      {children}
    </div>
  );

  if (children) {
    return (
      <>
        <button
          className={style.button}
          onClick={handleClick}
        >
          <img
            src={getPoster(poster_path, "200")}
            alt={mediaTitle}
            className={style.poster}
          />
        </button>

        {childVisible ? modal : null}
      </>
    );
  }

  if (!children) {
    return (
      <>
        <a href={`/${media_type}/${id}`}>
          <img
            src={getPoster(poster_path, "200")}
            alt={mediaTitle}
            className={style.button}
          />
        </a>

        {childVisible ? modal : null}
      </>
    );
  }
};

export default PosterButton;
