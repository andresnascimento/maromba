import { useEffect, useRef } from "react";

// a session older than this is treated as abandoned and starts over
const MAX_SESSION_MS = 4 * 60 * 60 * 1000;

const storageKey = (workoutId) => `session-start-${workoutId}`;

function readStart(workoutId) {
  try {
    const saved = Number(sessionStorage.getItem(storageKey(workoutId)));
    if (saved && Date.now() - saved < MAX_SESSION_MS) return saved;
  } catch {
    // storage blocked (private mode etc.): fall back to an in-memory start
  }
  return null;
}

function saveStart(workoutId, startedAt) {
  try {
    sessionStorage.setItem(storageKey(workoutId), String(startedAt));
  } catch {
    // ignore, the timer still works until the page reloads
  }
}

/**
 * Times a workout session. Starts when the workout page opens and keeps
 * running across reloads of the same tab, until `finishSession` is called.
 */
export function useSessionTimer(workoutId) {
  const startedAt = useRef(null);

  useEffect(() => {
    startedAt.current = readStart(workoutId) ?? Date.now();
    saveStart(workoutId, startedAt.current);
  }, [workoutId]);

  // returns the session length in seconds and clears the saved start
  function finishSession() {
    const seconds = Math.round((Date.now() - (startedAt.current ?? Date.now())) / 1000);
    try {
      sessionStorage.removeItem(storageKey(workoutId));
    } catch {
      // ignore
    }
    return seconds;
  }

  return { finishSession };
}

// 45 → "45s", 2400 → "40min", 3900 → "1h 05min"
export function formatDuration(totalSeconds) {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const totalMinutes = Math.round(totalSeconds / 60);
  if (totalMinutes < 60) return `${totalMinutes}min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}h ${minutes}min`;
}
