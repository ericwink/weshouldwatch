import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import style from "./groupEntry.module.css";

interface Collection {
  id: string;
  watched: boolean;
}

interface Props {
  onClick: (groupID: string) => void;
  collection: Collection[];
  id: string;
  name: string;
  movieID: string;
}

const GroupEntry = ({ onClick, collection, id, name, movieID }: Props) => {
  const add = <FontAwesomeIcon icon={faCirclePlus} />;
  const check = <FontAwesomeIcon icon={faCheck} />;

  const checkIfIncluded = (collection: Collection[]) => {
    for (let each of collection) {
      if (each.id === movieID) return true;
    }
    return false;
  };

  const checkResult = checkIfIncluded(collection);

  const buttonText = checkResult ? check : add;

  return (
    <div className={style.container}>
      <h1 key={name}>{name}</h1>
      <button
        onClick={() => onClick(id)}
        disabled={checkResult}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default GroupEntry;
