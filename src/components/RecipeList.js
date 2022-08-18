import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";

import { firestore } from "../firebase/config.js";

import deleteIcon from "../assets/delete-icon.svg";

import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">No results for recipes!</div>;
  }

  const handleClick = (id) => {
    firestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            className="delete"
            src={deleteIcon}
            alt={`Icon for Deleting ${recipe.title}`}
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
