import { useFetch } from "../../hooks/useFetch.js";

import "./Home.css";

import RecipeList from "../../components/RecipeList.js";

const Home = () => {
  const {
    isPending,
    data: recipes,
    error,
  } = useFetch("http://localhost:3000/recipes");

  return (
    <div className="home">
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;
