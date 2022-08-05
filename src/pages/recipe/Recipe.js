import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.js";

import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;
  const { isPending, data: recipe, error } = useFetch(url);

  return (
    <div>
      {isPending && <p classname="loading">Loading...</p>}
      {recipe && <h1>{recipe.title}</h1>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Recipe;
