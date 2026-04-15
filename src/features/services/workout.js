import { supabase } from "../../services/supabase";

export async function getWorkoutData() {
  const { data, error } = await supabase
    .from("user_state")
    .select(
      `
      last_workout_id,
      workouts (
        id,
        name,
        title,
        order_index
      )
    `,
    )
    .single();

  if (error) {
    console.error("Error on getting workout data", error.message);
    throw new Error(error.message);
  }

  const { data: workouts } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", "91a71bce-c3c1-43c2-9641-a3e8ad735419")
    // .eq("user_id", userData.user.id) // change after auth
    .order("order_index");

  return {
    lastWorkout: data.workouts,
    workouts,
  };
}
