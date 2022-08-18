import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme.js";

import { firestore } from "../../firebase/config.js";

import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    firestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRecipe(doc.data());
          setIsPending(false);
        } else {
          setError("404 - Couldn't find the recipe!");
          setIsPending(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
      });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
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
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Recipe;
