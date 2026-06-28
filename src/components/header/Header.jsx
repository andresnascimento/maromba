import styles from "./Header.module.css";
import Button from "../button/Button";
import userAvatar from "../../assets/img/avatar-1.png";

export default function Header({ titleLabel, children }) {
  return (
    <header className={`${styles.header} u-flex gap-16`}>
      <figure>
        <img src={userAvatar} alt="Andre's profile picture" />
      </figure>
      <h1 className={styles.headerTitle}>{titleLabel}</h1>
      {children}
    </header>
  );
}
