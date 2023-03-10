import { MediaProps } from "@/utilities/interface";
import getPoster from "../../utilities/getPoster";
import style from "./PosterButton.module.css";

const PosterButton = ({ poster_path, title }: MediaProps) => {
  return (
    <button className={style.button}>
      <img
        src={getPoster(poster_path, "200")}
        alt={title}
      />
      {title}
    </button>
  );
};

export default PosterButton;
