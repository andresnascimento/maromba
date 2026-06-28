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
