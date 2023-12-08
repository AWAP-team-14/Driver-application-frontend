import Home from "./screens/home";
import PickUp from "./screens/pickUp";
import DropOff from "./screens/dropOff";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pickup" element={<PickUp />} />
          <Route exact path="/dropoff" element={<DropOff />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
