import styles from "./ProgressBar.module.css";

export default function ProgressBar({
  completed,
  total,
  description,
  className,
}) {
  return (
    <section className={`${styles[className]}`}>
      <progress value={completed} max={total}></progress>
      <p className={styles.legend}>
        {completed} of {total} {description}
      </p>
    </section>
  );
}
