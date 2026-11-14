import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getExercises,
  updateExerciseWeight,
} from "../features/services/exercises";
import userState from "../features/services/userState";

import Button from "../components/button";
import List from "../components/list/";
import Exercise from "../components/exercises";
import Loading from "../components/loading";
import ProgressBar from "../components/progressBar/";
import PageHeader from "../components/pageHeader/";
import DialogFeedback from "../components/dialog/DialogFeedback";
import Drawer from "../components/drawer";
import { useSessionTimer } from "../hooks/useSessionTimer";
import ExerciseWeightForm from "../components/exercises/ExerciseWeightForm";

import "../styles/global.css";
import confirm from "../assets/img/confirm.webp";

export default function Exercises() {
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseData, setExerciseData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [checkedExercises, setCheckedExercises] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // the drawer keeps the last exercise while it slides closed;
  // weightDrawerKey resets the form every time it opens
  const [weightExerciseId, setWeightExerciseId] = useState(null);
  const [isWeightDrawerOpen, setIsWeightDrawerOpen] = useState(false);
  const [weightDrawerKey, setWeightDrawerKey] = useState(0);
  const weightExercise = exercises.find(
    (exercise) => exercise.id === weightExerciseId,
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const { finishSession } = useSessionTimer(id);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getExercises(id);

        setExerciseData(data || {});
        setExercises(data?.exercises || []);
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

  function openWeightDrawer(exerciseId) {
    setWeightExerciseId(exerciseId);
    setWeightDrawerKey((key) => key + 1);
    setIsWeightDrawerOpen(true);
  }

  async function handleWeightChange(exerciseId, weight) {
    setIsWeightDrawerOpen(false);
    const previous = exercises;
    // update the screen right away, revert if saving fails
    setExercises((current) =>
      current.map((exercise) =>
        exercise.id === exerciseId ? { ...exercise, weight } : exercise,
      ),
    );
    try {
      await updateExerciseWeight(exerciseId, weight);
    } catch (error) {
      console.error("Error saving weight:", error);
      setExercises(previous);
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
          durationSeconds: finishSession(),
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
        title={exerciseData.title}
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
                onWeightClick={() => openWeightDrawer(exercise.id)}
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
      <Drawer
        isOpen={isWeightDrawerOpen}
        onClose={() => setIsWeightDrawerOpen(false)}
        labelledBy="weight-drawer-title"
      >
        {weightExercise && (
          <ExerciseWeightForm
            key={weightDrawerKey}
            exercise={weightExercise}
            titleId="weight-drawer-title"
            onSave={(weight) => handleWeightChange(weightExercise.id, weight)}
            onClose={() => setIsWeightDrawerOpen(false)}
          />
        )}
      </Drawer>
      <Drawer
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        labelledBy="incomplete-workout-title"
      >
        <DialogFeedback
          titleId="incomplete-workout-title"
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
      </Drawer>
    </div>
  );
}
