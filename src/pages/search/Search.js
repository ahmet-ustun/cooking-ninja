import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.js";

import "./Search.css";

import RecipeList from "../../components/RecipeList.js";

const Search = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("query");

  const url = `http://localhost:3000/recipes?q=${query}`;
  const { isPending, data: recipes, error } = useFetch(url);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Search;
