import styles from "./Header.module.css";
import Button from "../button/Button";

export default function Header({ titleLabel }) {
  return (
    <header className={`${styles.header} u-flex gap-16`}>
      <figure>
        <img
          src="./src/assets/img/avatar-1.png"
          alt="Andre's profile picture"
        />
      </figure>
      <h1 className={styles.headerTitle}>{titleLabel}</h1>
      <Button
        iconName={"logout"}
        size="sm"
        leadingIcon={true}
        ariaLabel={"Log out"}
      />
    </header>
  );
}
