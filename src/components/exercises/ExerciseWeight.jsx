import styles from "./ExerciseWeight.module.css";

export default function ExerciseWeight({ weight, exerciseName, onClick }) {
  const hasWeight = weight !== null && weight !== undefined;

  return (
    <button
      type="button"
      className={hasWeight ? styles.weightValue : styles.weightEmpty}
      aria-haspopup="dialog"
      aria-label={
        hasWeight
          ? `Weight for ${exerciseName}: ${weight} kg. Edit weight`
          : `Add weight for ${exerciseName}`
      }
      onClick={onClick}
    >
      {hasWeight ? `${weight} kg` : "+ weight"}
    </button>
  );
}
