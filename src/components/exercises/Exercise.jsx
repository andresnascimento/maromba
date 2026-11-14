import styles from "./Exercise.module.css";
import ExerciseWeight from "./ExerciseWeight";

export default function Exercise({ exercise, onChange, onWeightClick }) {
  return (
    <article className={`${styles.exerciseItem} u-flex gap-16`}>
      <label className={styles.exerciseItemCheckbox}>
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
      {/* outside the label, so tapping the weight doesn't toggle the checkbox */}
      <ExerciseWeight
        weight={exercise.weight}
        exerciseName={exercise.exercise}
        onClick={onWeightClick}
      />
    </article>
  );
}
