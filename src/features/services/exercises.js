import { supabase } from "../../services/supabase";
export async function getExercises(workoutId) {
  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      id,
      name,
      title,
      order_index,
      exercises (
        id,
        order_index,
        exercise,
        sets,
        reps,
        rest,
        description,
        weight
      )
    `,
    )
    .eq("id", workoutId)
    .order("order_index", { foreignTable: "exercises" })
    .single();

  if (error) {
    console.error("Error loading exercises", error);
    return null;
  }

  return data;
}

export async function updateExerciseWeight(exerciseId, weight) {
  const { data, error } = await supabase
    .from("exercises")
    .update({ weight })
    .eq("id", exerciseId)
    .select("id, weight");

  if (error) throw new Error(error.message);
  // Supabase returns no rows (instead of an error) when an RLS policy blocks the update.
  if (!data?.length) throw new Error("Weight not saved: update not allowed");

  return data[0];
}
