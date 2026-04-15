import { getWorkoutData } from "../features/services/workout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/button";
import Header from "../components/header";
import PageHeader from "../components/pageHeader/";
import List from "../components/list/List";
import CardWorkout from "../components/card/CardWorkout";

import "../styles/global.css";

export default function Home() {
  const [workoutData, setWorkoutData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastWorkout, setLastWorkout] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);

        const data = await getWorkoutData();

        setWorkoutData(data?.workouts || []);
        setLastWorkout(data?.lastWorkout || null);
      } catch (error) {
        console.error("Error loading workouts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  function handleNavigate(id) {
    navigate(`/workout/${id}`);
  }
  function setCurrentDate() {
    const date = new Date();
    const formatted = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    })
      .format(date)
      .replace(" ", ", ");
    return formatted;
  }

  return (
    <>
      <Header titleLabel="Welcome André!" />
      <main>
        <PageHeader subtitle={`Today's workout:`} className="workoutPageHeader">
          <h1>
            <time>{setCurrentDate()}</time>
          </h1>
        </PageHeader>
        <List
          isLoading={isLoading}
          items={workoutData}
          renderItem={(workout) => (
            <CardWorkout workout={workout}>
              <Button
                size="md"
                trailingIcon={true}
                iconName="arrow_forward"
                onClick={() => {
                  handleNavigate(workout.id);
                }}
              >
                Start workout {workout.name}
              </Button>
            </CardWorkout>
          )}
        />
      </main>
    </>
  );
}
