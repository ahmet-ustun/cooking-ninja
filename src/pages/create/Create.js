import { useState } from "react";

import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, method, cookingTime);
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            value={title}
            required
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        {/* TODO: Ingredients go here. */}
        <label>
          <span>Recipe method:</span>
          <textarea
            value={method}
            required
            onChange={(event) => setMethod(event.target.value)}
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            value={cookingTime}
            required
            onChange={(event) => setCookingTime(event.target.value)}
          />
        </label>
        <button className="btn">submit</button>
      </form>
    </div>
  );
};

export default Create;
