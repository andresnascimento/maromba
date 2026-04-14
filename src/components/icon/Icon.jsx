import styles from "./Icon.module.css";

export default function Icon({ variant = "outlined", iconName, size }) {
  const classes = [styles[size], `material-symbols-${variant}`].join(" ");
  return (
    <span aria-hidden="true" className={classes}>
      {" "}
      {iconName}{" "}
    </span>
  );
}
