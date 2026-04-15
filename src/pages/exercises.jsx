import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExercises } from "../features/services/exercises";
import { useNavigate } from "react-router-dom";

import Button from "../components/button";
import List from "../components/list/";
import Exercise from "../components/exercises";
import Loading from "../components/loading";

import "../styles/global.css";

export default function Exercises() {
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [checkedExercises, setCheckedExercises] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getExercises(id);
        // console.log(data);
        setExerciseData(data || {});
        setExercises(data.exercises || []);
      } catch (error) {
        console.error("Error loading exercises:", error);
      } finally {
        setIsLoading(false);
        // console.log(exercises);
      }
    }

    load();
  }, [id]);

  function handleCheckExercise(id) {
    if (checkedExercises.includes(id)) {
      const updated = checkedExercises.filter(
        (exerciseId) => exerciseId !== id,
      );
      setCheckedExercises(updated);
    } else {
      setCheckedExercises((exercisesId) => [...exercisesId, id]);
    }
  }

  if (!exerciseData) return <Loading />;
  return (
    <>
      <header>
        <nav aria-label="Breadcrumb">
          <Button
            iconName="arrow_back "
            variant="text"
            size="xs"
            leadingIcon={true}
            onClick={() => navigate("/")}
          >
            Back to workout list
          </Button>
        </nav>
        <h1>Workout {exerciseData.name}</h1>
        <p>{exerciseData.title}</p>
      </header>
      <main>
        <section>
          <progress
            value={checkedExercises.length}
            max={exercises.length}
          ></progress>
          <p className="exercise__progress-legend">
            {checkedExercises.length} of {exercises.length} exercises completed
          </p>
        </section>
        <section aria-labelledby="exercise-list-title">
          <h2 id="exercise-list-title" className="visually-hidden">
            Exercise List
          </h2>
          <List
            isLoading={isLoading}
            items={exercises}
            className="exercisesList"
            renderItem={(exercise) => (
              <Exercise
                exercise={exercise}
                onChange={() => handleCheckExercise(exercise.id)}
              />
            )}
          />
          <Button size="xl" variant="btnSubmitPrimary">
            Finish Workout
          </Button>
        </section>
      </main>
    </>
  );
}
