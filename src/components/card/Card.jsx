import styles from "./Cards.module.css";

export default function Card({ children }) {
  return <article className={styles.workoutCard}>{children}</article>;
}
