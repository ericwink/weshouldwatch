import { BsHandThumbsUp, BsClock, BsCalendar } from "react-icons/bs";

interface Props {
  releaseYear: string | undefined;
  runTime: number | undefined;
  rating: string;
}

const DateTimeRating = ({ releaseYear = "????", runTime = 0, rating = "N/A" }: Props) => {
  return (
    <div className="container flex justify-between">
      <div className="flex gap-1 items-center">
        <BsCalendar />
        <p>{releaseYear}</p>
      </div>

      <div className="flex gap-1 items-center">
        <BsClock />
        {runTime > 0 ? <p>{runTime} minutes</p> : <p>unknown</p>}
      </div>
      <div className="flex gap-1 items-center">
        <BsHandThumbsUp />
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default DateTimeRating;
