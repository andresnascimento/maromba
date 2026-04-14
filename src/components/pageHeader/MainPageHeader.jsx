import styles from "./PageHeader.module.css";

export default function MainPageHeader({ title, date, subtitle }) {
  return (
    <section className={styles.workoutInfo}>
      {title ? (
        <h2 className={styles.workoutTitle}>{title}</h2>
      ) : (
        <time className={styles.workoutInfoDate}>{date}</time>
      )}
      {/* <time className={styles.workoutInfoDate}>{date}</time> */}
      <p className={styles.workoutInfoTitle}>{subtitle}</p>
    </section>
  );
}
