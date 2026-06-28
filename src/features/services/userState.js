import { supabase } from "../../services/supabase";

async function saveLastWorkout(workoutId) {
  // change table structure when add multiple users. Connect the table with user_id.
  const { data, error } = await supabase
    .from("user_state")
    .update({
      last_workout_id: workoutId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", "5a71243d-89b4-4a35-ba45-270a28ba8850")
    .select();
  // .single();
  if (error) {
    console.error("error updating user_state:", error);
    return null;
  }
  return data;
}

async function getLastWorkout() {
  const { data, error } = await supabase
    .from("user_state")
    .select(
      `
      last_workout_id,
      workouts (
        id,
        name,
        title
      )
    `,
    )
    .single();

  if (error) {
    console.error("Error on getting last workout", error.message);
    throw new Error(error.message);
  }
  return data;
}

export default { getLastWorkout, saveLastWorkout };
