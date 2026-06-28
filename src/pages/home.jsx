import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkoutData } from "../features/services/workout";
import userState from "../features/services/userState";

import Button from "../components/button";
import CardWorkout from "../components/card/CardWorkout";
import Header from "../components/header";
import List from "../components/list/List";
import PageHeader from "../components/pageHeader/";

import "../styles/global.css";

export default function Home() {
  const [workoutData, setWorkoutData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        // fetch
        const data = await getWorkoutData();
        const lastWorkout = await userState.getLastWorkout();

        // sort
        if (data.workouts !== null) {
          console.log("lastWorkOut:", lastWorkout);
          let sortedWorkout = data.workouts;
          const index = sortedWorkout.findIndex((workout) => {
            if (workout.id === data.lastWorkout.id) {
              // console.log(workout.id, data.lastWorkout.id);
              return workout;
            }
          });

          // set the next workout index
          const nextIndex = (index + 1) % sortedWorkout.length;
          sortedWorkout = [
            ...sortedWorkout.slice(nextIndex),
            ...sortedWorkout.slice(0, nextIndex),
          ];
          // save
          setWorkoutData(sortedWorkout);
        }
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
      <Header titleLabel="Welcome André!">
        <Button
          variant="ghost"
          iconName={"logout"}
          size="sm"
          leadingIcon={true}
          ariaLabel={"Log out"}
          onClick={() => {
            console.log("workout list: ", workoutData);
          }}
        ></Button>
      </Header>
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
