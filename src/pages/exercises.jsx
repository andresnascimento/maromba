import { useParams } from "react-router-dom";

export default function Exercises() {
  const { id } = useParams();

  return <h1>Workout {id}</h1>;
}
