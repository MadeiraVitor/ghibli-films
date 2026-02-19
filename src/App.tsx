import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { FilmDetails } from "./pages/FilmDetails/FilmDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/films/:id" element={<FilmDetails />} />
    </Routes>
  );
}

export default App;
