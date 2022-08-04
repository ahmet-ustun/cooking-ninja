import { useFetch } from "../../hooks/useFetch.js";

import "./Home.css";

const Home = () => {
  const { isPending, data, error } = useFetch("http://localhost:3000/recipes");

  return (
    <div className="home">
      {isPending && <p className="loading">Loading...</p>}
      {data && data.map((recipe) => <h2 key={recipe.id}>{recipe.title}</h2>)}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;
