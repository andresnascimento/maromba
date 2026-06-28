import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExercises } from "../features/services/exercises";
import userState from "../features/services/userState";

import Button from "../components/button";
import List from "../components/list/";
import Exercise from "../components/exercises";
import Loading from "../components/loading";
import ProgressBar from "../components/progressBar/";
import PageHeader from "../components/pageHeader/";
import Dialog from "../components/dialog/";
import DialogFeedback from "../components/dialog/DialogFeedback";

import "../styles/global.css";
import confirm from "../assets/img/confirm.gif";

export default function Exercises() {
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getExercises(id);

        setExerciseData(data || {});
        setExercises(data.exercises || []);
      } catch (error) {
        console.error("Error loading exercises:", error);
      } finally {
        setIsLoading(false);
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

  function handleSaveWorkout(id) {
    try {
      userState.saveLastWorkout(id);
    } catch (error) {
      console.error("Controller error:", error);
    } finally {
      navigate("/finishedSession", {
        state: {
          workoutId: exerciseData.id,
          workoutName: exerciseData.name,
          totalExercises: exercises.length,
          completed: checkedExercises.length,
          duration: 40,
        },
      });
    }
  }

  function handleFinishWorkout(id) {
    checkedExercises.length === exercises.length
      ? handleSaveWorkout(id)
      : setIsDialogOpen(true);
  }

  if (!exerciseData) return <Loading />;
  return (
    <div className="u-grid gap-24">
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
      <PageHeader
        title={`Workout ${exerciseData.name}`}
        subtitle={exerciseData.title}
        className="exercisePageHeader"
      />

      <ProgressBar
        completed={checkedExercises.length}
        total={exercises.length}
        description="completed exercises"
        className="exercisesProgress"
      />
      <main>
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
          <Button
            size="xl"
            variant="btnSubmitPrimary"
            disabled={checkedExercises.length > 0 ? false : true}
            onClick={() => handleFinishWorkout(exerciseData.id)}
          >
            Finish Workout
          </Button>
        </section>
      </main>
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogFeedback
          image={confirm}
          title="Incomplete Workout"
          subtitle={` You haven't checked all exercises yet. Are you sure you want to finish
          this workout session?`}
        >
          <Button
            variant="ghost"
            size="md"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="md"
            variant="secondary"
            onClick={() => {
              handleSaveWorkout(exerciseData.id);
              console.log("opa:", exerciseData.id);
            }}
          >
            Finish anyway
          </Button>
        </DialogFeedback>
      </Dialog>
    </div>
  );
}
