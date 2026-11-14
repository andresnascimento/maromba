import { useEffect, useRef } from "react";
import styles from "./Drawer.module.css";

const ANIMATION_MS = 300;

export default function Drawer({ isOpen, onClose, labelledBy, children }) {
  const ref = useRef();

  useEffect(() => {
    const dialog = ref.current;
    let timer;

    if (isOpen) {
      // the slide-up comes from @starting-style in the CSS
      if (!dialog.open) dialog.showModal();
    } else {
      // keep the dialog in the page until the slide-down transition ends
      timer = setTimeout(() => dialog.close(), ANIMATION_MS);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Escape: animate out instead of the browser closing it instantly
  function handleCancel(e) {
    e.preventDefault();
    onClose();
  }

  // the dialog itself only receives clicks on the backdrop,
  // because all content is inside .drawerContent
  function handleClick(e) {
    if (e.target === ref.current) onClose();
  }

  return (
    <dialog
      ref={ref}
      className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
      aria-labelledby={labelledBy}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      <div className={styles.drawerContent}>
        <span aria-hidden="true" className={styles.drawerHandle}></span>
        {children}
      </div>
    </dialog>
  );
}
