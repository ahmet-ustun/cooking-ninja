import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.js";
import { useTheme } from "../../hooks/useTheme.js";

import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;
  const { isPending, data: recipe, error } = useFetch(url);
  const { mode } = useTheme();

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Recipe;
