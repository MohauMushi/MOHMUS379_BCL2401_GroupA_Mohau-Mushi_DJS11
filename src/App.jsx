import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import Favourites from "./pages/Favourites";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
