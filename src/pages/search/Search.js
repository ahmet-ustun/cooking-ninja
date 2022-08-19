import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme.js";

import { firestore } from "../../firebase/config.js";

import "./Search.css";

import RecipeList from "../../components/RecipeList.js";

const Search = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("query").toLowerCase();
  const { mode } = useTheme();

  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsubscribe = firestore
      .collection("recipes")
      .orderBy("title")
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setError("There aren't any recipes yet!");
            setIsPending(false);
          } else {
            const results = [];
            snapshot.docs.forEach((doc) => {
              const docData = doc.data();
              if (docData.title.toLowerCase().includes(query)) {
                results.push({ id: doc.id, ...docData });
              }
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
  }, [query]);

  return (
    <div className={`search ${mode}`}>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Search;
