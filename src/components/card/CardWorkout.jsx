import styles from "./Cards.module.css";

export default function CardWorkout({ workout, children }) {
  return (
    <article className={styles.workoutCard}>
      <header className={`${styles.workoutCardTypeContainer} u-flex`}>
        <span aria-hidden="true" className={styles.workoutCardWorkoutType}>
          {workout.name}
        </span>
        <h2 className={styles.workoutCardTitle}>{workout.title}</h2>
      </header>

      <div className={styles.cardWorkoutBodyContainer}>{children}</div>
    </article>
  );
}
