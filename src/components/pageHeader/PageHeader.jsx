import styles from "./PageHeader.module.css";

export default function PageHeader({ title, children, subtitle, className }) {
  return (
    <header className={`${styles[className]}`}>
      {title && <h1>{title}</h1>}
      {children}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
