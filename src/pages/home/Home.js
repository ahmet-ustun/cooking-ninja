import { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme.js";

import { firestore } from "../../firebase/config.js";

import "./Home.css";

import RecipeList from "../../components/RecipeList.js";

const Home = () => {
  const { mode } = useTheme();

  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsubscribe = firestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("There aren't any recipes yet!");
          setIsPending(false);
        } else {
          const results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setRecipes(results);
          setIsPending(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className={`home ${mode}`}>
      {recipes && <RecipeList recipes={recipes} />}
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;
