import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function RecipeIndex(props) {
  const { recipesMade } = props;
  const [allRecipesObjectArray, setAllRecipesObjectArray] = useState([]);

  async function getRecipes() {
    try {
      const response = await axios.get('/recipes');
      setAllRecipesObjectArray(response.data);
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => { getRecipes(); }, [recipesMade]);

  function ListAllRecipesObjectArray() {
    function ListArray(arr) {
      return (
        arr.map((item) => (<li>{item}</li>))
      );
    }
    function handleViewRecipeClick(recipeObject) {
      console.log(recipeObject);
    }
    const mapping = allRecipesObjectArray.map((recipeObject) => (
      <div className="recipeindexview">
        <div className={`recipe${recipeObject.id.toString()}`}>
          id:
          {recipeObject.id}
          <br />
          title:
          {recipeObject.title}
          <br />
          ingredients:
          <ul>{ListArray(recipeObject.ingredients)}</ul>
          <br />
          instructions:
          <ol>{ListArray(recipeObject.instructions)}</ol>
          <br />
          created_at:
          {recipeObject.created_at}
          <br />
        </div>
        <button type="button" onClick={() => { handleViewRecipeClick(recipeObject); }}>Expand Recipe</button>
      </div>
    ));
    return mapping; // IDK HOW THIS WORKS INTUITIVELY, IS THIS AN ARRAY OF <></> ELEMENTS???
  }

  return (
    <ListAllRecipesObjectArray />
  );
}

RecipeIndex.propTypes = {
  recipesMade: PropTypes.number.isRequired,
};

export default RecipeIndex;
