import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TvShows from "./pages/TvShows";
import AllFilms from "./pages/AllFilms";
import Shorts from "./pages/Shorts";
import FilmDetails from "./pages/FilmDetails";

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/">
        <Route element={<AllFilms />} index />
        <Route element={<Shorts />} path="shorts" />
        <Route element={<TvShows />} path="tvshows" />
        <Route element={<FilmDetails />} path="film/:id" />
      </Route>
    </Routes>
  );
}

export default App;
