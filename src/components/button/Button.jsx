import styles from "./Button.module.css";
import Icon from "../icon/Icon";

export default function Button({
  variant = "primary",
  size,
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  children,
  leadingIcon = false,
  trailingIcon = false,
  iconName,
  ariaLabel,
}) {
  const classes = [
    styles.btn,
    styles[variant],
    size && styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    disabled && styles.disabled,
    "u-flex",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {leadingIcon && <Icon size={size} iconName={iconName} />}

      {children}

      {trailingIcon && <Icon size={size} iconName={iconName} />}
    </button>
  );
}
