import styles from "./Exercise.module.css";

export default function Exercise({ exercise, onChange }) {
  return (
    <article className={styles.exerciseItem}>
      <label className={`u-flex ${styles.exerciseItemCheckbox}`}>
        <input
          type="checkbox"
          name={exercise.exercise}
          value={exercise.exercise}
          onChange={onChange}
        />
        <span className={styles.checkboxBox}></span>
        <div className={styles.exerciseContentContainer}>
          <p className={styles.exerciseName}>{exercise.exercise}</p>
          <p className={styles.exerciseInfo}>
            {exercise.sets}x{exercise.reps} | {exercise.rest} rest
          </p>
        </div>
      </label>
    </article>
  );
}
