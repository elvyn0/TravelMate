import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Itinerary from "./pages/Itinerary";
import Shared from "./pages/Shared";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/itinerary/:id" element={<Itinerary />} />
        <Route path="/share/:shareId" element={<Shared />} />
      </Routes>
    </div>
  );
}

export default App;
