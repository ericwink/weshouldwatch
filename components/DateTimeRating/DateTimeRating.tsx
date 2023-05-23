import { BsHandThumbsUp, BsClock, BsCalendar } from "react-icons/bs";

interface Props {
  releaseYear: string;
  runTime: string;
  rating: string;
}

const DateTimeRating = ({ releaseYear, runTime, rating }: Props) => {
  return (
    <div className="container flex justify-between">
      <div className="flex gap-1 items-center">
        <BsCalendar />
        <p>{releaseYear}</p>
      </div>

      <div className="flex gap-1 items-center">
        <BsClock />
        <p>{runTime} minutes</p>
      </div>
      <div className="flex gap-1 items-center">
        <BsHandThumbsUp />
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default DateTimeRating;
