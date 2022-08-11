import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Searchbar.css";

const Searchbar = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${term}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          required
          onChange={(event) => setTerm(event.target.value)}
        />
      </form>
    </div>
  );
};

export default Searchbar;
