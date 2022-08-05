import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import Home from "./pages/home/Home.js";
import Create from "./pages/create/Create.js";
import Search from "./pages/search/Search.js";
import Recipe from "./pages/recipe/Recipe.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
