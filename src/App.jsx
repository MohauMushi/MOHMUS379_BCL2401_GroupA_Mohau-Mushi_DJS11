import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Favourites from "./pages/Favourites";
import Layout from "./components/Layout/Layout";
import PodcastPreview from "./pages/PodcastPreview/PodcastPreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/show/:id" element={<PodcastPreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
