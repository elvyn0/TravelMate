import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Itinerary from "./pages/Itinerary";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/itinerary" element={<Itinerary />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
