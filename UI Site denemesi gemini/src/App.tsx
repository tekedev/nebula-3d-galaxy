import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Free } from "./pages/Free";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Hyliox clone landing page */}
        <Route path="/" element={<Home />} />

        {/* Free prompt lead magnet landing page with popup modal */}
        <Route path="/free" element={<Free />} />
      </Routes>
    </Router>
  );
}

export default App;
