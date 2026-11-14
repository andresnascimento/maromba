import { useState } from "react";
import Button from "../button";
import Icon from "../icon";
import styles from "./ExerciseWeightForm.module.css";

const STEP = 1;
const QUICK_ADD = [2.5, 5, 10];

// avoids float noise like 0.1 + 0.2 = 0.30000000000000004
const round = (n) => Math.round(n * 100) / 100;

function parseWeight(text) {
  if (text.trim() === "") return null;
  return Number(text.replace(",", "."));
}

export default function ExerciseWeightForm({
  exercise,
  titleId,
  onSave,
  onClose,
}) {
  const previous = exercise.weight ?? null;
  const [draft, setDraft] = useState(previous === null ? "" : String(previous));

  const value = parseWeight(draft);
  const isValid = value === null || (!Number.isNaN(value) && value >= 0);
  const diff =
    previous !== null && value !== null && isValid
      ? round(value - previous)
      : 0;

  function addToWeight(amount) {
    const base = isValid && value !== null ? value : 0;
    setDraft(String(Math.max(0, round(base + amount))));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onSave(value === null ? null : round(value));
  }

  return (
    <form className={styles.weightForm} onSubmit={handleSubmit}>
      <header className="u-flex u-space-between gap-16">
        <div>
          <h2 id={titleId} className={styles.title}>
            {exercise.exercise}
          </h2>
          <p className={styles.info}>
            {exercise.sets}x{exercise.reps} | {exercise.rest} rest
          </p>
        </div>
        <Button
          variant="text"
          iconName="close"
          leadingIcon={true}
          ariaLabel="Close"
          onClick={onClose}
        />
      </header>

      <div className="u-flex u-space-between gap-16">
        <button
          type="button"
          className={styles.stepButton}
          aria-label={`Decrease weight by ${STEP} kg`}
          onClick={() => addToWeight(-STEP)}
        >
          <Icon iconName="remove" />
        </button>

        <label className={`${styles.valueField} u-flex gap-8`}>
          <span className="visually-hidden">Weight in kg</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="0"
            className={styles.valueInput}
            style={{ width: `${Math.max(draft.length, 1) + 0.5}ch` }}
            value={draft}
            aria-invalid={!isValid}
            onChange={(e) => setDraft(e.target.value)}
          />
          <span aria-hidden="true" className={styles.unit}>
            kg
          </span>
        </label>

        <button
          type="button"
          className={styles.stepButton}
          aria-label={`Increase weight by ${STEP} kg`}
          onClick={() => addToWeight(STEP)}
        >
          <Icon iconName="add" />
        </button>
      </div>

      {previous !== null && (
        <p className={styles.lastTime} aria-live="polite">
          Last time: {previous} kg
          {diff !== 0 && (
            <>
              {" · "}
              <span className={diff > 0 ? styles.diffUp : styles.diffDown}>
                {diff > 0 ? "+" : "−"}
                {Math.abs(diff)} kg
              </span>
            </>
          )}
        </p>
      )}

      <div className="u-flex u-center gap-12">
        {QUICK_ADD.map((amount) => (
          <button
            key={amount}
            type="button"
            className={styles.quickAdd}
            aria-label={`Add ${amount} kg`}
            onClick={() => addToWeight(amount)}
          >
            +{amount}
          </button>
        ))}
      </div>

      <Button
        variant="secondary"
        size="lg"
        fullWidth={true}
        disabled={!isValid}
        onClick={handleSubmit}
      >
        Save weight
      </Button>
    </form>
  );
}
