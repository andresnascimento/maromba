import Button from "../button";
import styles from "./Dialog.module.css";

export default function DialogFeedback({
  title,
  titleId,
  image,
  subtitle,
  children,
}) {
  return (
    <>
      <form method="dialog">
        {image && (
          <figure className={styles.dialogConfirmImage}>
            <img src={image} alt="" />
          </figure>
        )}
        <h2 id={titleId} className={styles.dialogTitle}>
          {title}
        </h2>

        <p>{subtitle}</p>

        <menu className={`${styles.dialogFooter} u-flex`}>{children}</menu>
      </form>
    </>
  );
}
