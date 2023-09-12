import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import WeekView from "./components/WeekView";
import { HabitState } from "./context/HabitState";

function App() {
  return (
    <div className="App">
      <HabitState>
        <Navbar />
        <Routes>
          <Route exact path="/weekView" element={<WeekView />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </HabitState>
    </div>
  );
}

export default App;
