// // import { useState } from "react";
// import { getWorkoutData } from "./features/services/workout";
// import { useEffect, useState } from "react";
// import Button from "./components/button";
// import Header from "./components/header";
// import "./styles/global.css";
// import CardWorkout from "./components/card/CardWorkout";
// import MainPageHeader from "./components/pageHeader/MainPageHeader";
// import List from "./components/List";

// export default function App() {
//   const [workoutData, setWorkoutData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [lastWorkout, setLastWorkout] = useState("");

//   useEffect(() => {
//     async function load() {
//       try {
//         setIsLoading(true);

//         const data = await getWorkoutData();

//         setWorkoutData(data?.workouts || []);
//         setLastWorkout(data?.lastWorkout || null);
//       } catch (error) {
//         console.error("Error loading workouts:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     load();
//   }, []);
//   // console.log("1aaaaa:", workoutData);

//   function setCurrentDate() {
//     const date = new Date();
//     const formatted = new Intl.DateTimeFormat("en-US", {
//       month: "short",
//       day: "2-digit",
//     })
//       .format(date)
//       .replace(" ", ", ");
//     return formatted;
//   }
//   return (
//     <>
//       <Header titleLabel="Welcome André!" />
//       <main>
//         <MainPageHeader date={setCurrentDate()} subtitle={`Today's workout:`} />
//         <List
//           isLoading={isLoading}
//           items={workoutData}
//           renderItem={(workout) => (
//             <CardWorkout workout={workout}>
//               <Button size="md" trailingIcon={true} iconName="arrow_forward">
//                 Start workout {workout.name}
//               </Button>
//             </CardWorkout>
//           )}
//         />
//       </main>
//     </>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Exercises from "./pages/exercises";
import FinishedSession from "./pages/finishedSession";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout/:id" element={<Exercises />} />
        <Route path="/finishedSession/" element={<FinishedSession />} />
      </Routes>
    </BrowserRouter>
  );
}
