import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme.js";

import { firestore } from "../../firebase/config.js";

import "./Create.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const ingredientInput = useRef(null);

  const navigate = useNavigate();
  const { mode } = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const document = {
      title,
      ingredients,
      method,
      cookingTime: `${cookingTime} minutes`,
    };

    try {
      await firestore.collection("recipes").add(document);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const ingredient = newIngredient.trim();

    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }

    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className={`create ${mode}`}>
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
        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              value={newIngredient}
              ref={ingredientInput}
              onChange={(event) => setNewIngredient(event.target.value)}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient}, </em>
          ))}
        </p>
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
