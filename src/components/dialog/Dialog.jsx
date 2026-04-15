import { useEffect, useRef, useState } from "react";
import styles from "./Dialog.module.css";

export default function Dialog({ isOpen, onClose, children }) {
  const [active, setActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    let timer;
    if (isOpen) {
      ref.current.showModal();
      timer = setTimeout(() => {
        setActive(true);
      }, 100);
    } else {
      ref.current.close();
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
      setActive(false);
    };
  }, [isOpen]);

  function handleClick(e) {
    if (e.target === ref.current) {
      onClose();
    }
  }

  return (
    <dialog
      className={
        active
          ? `${styles.dialog} ${styles.open}`
          : `${styles.dialog} ${styles.closing}`
      }
      ref={ref}
      onClose={onClose}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
}
