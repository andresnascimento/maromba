import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/card/Card";
import Button from "../components/button";
import Icon from "../components/icon";

import finishedImage from "../assets/img/workout-success-1.gif";
import styles from "./finishedSession.module.css";
// import { useEffect } from "react";

export default function FinishedSession() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return (
      <section>
        <h2>Oops, something is wrong!</h2>
        <Button variant="text" size="xs" onClick={() => navigate("/")}>
          Back to workout list
        </Button>
      </section>
    );

  return (
    <Card>
      <header>
        <figure className={styles.successImage}>
          <img src={finishedImage} alt="" />
        </figure>
        <h2 className={styles.successTitle}>
          Workout {state.workoutName} Finished!
        </h2>
      </header>
      <section>
        <ul className={styles.sessionStatusList}>
          <li>
            <Icon iconName="check" />{" "}
            {`${state.completed} of ${state.totalExercises} completed`}
          </li>
          <li>
            <Icon iconName="check" /> {`40min session`}
          </li>
        </ul>
        <Button
          variant="primary"
          size="lg"
          fullWidth={true}
          onClick={() => navigate("/")}
        >
          Back to workout list
        </Button>
      </section>
    </Card>
  );
}
