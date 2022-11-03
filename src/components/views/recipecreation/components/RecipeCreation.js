import axios from 'axios';
import { useState, React } from 'react';
import PropTypes from 'prop-types';

function RecipeCreation(props) {
  const { recipesMade, setRecipesMade } = props;

  //   RECIPE CREATION PROPS
  const [recipeTitleFormInput, setRecipeTitleFormInput] = useState('');
  function handleRecipeTitleFormInputChange(event) {
    setRecipeTitleFormInput(event.target.value);
  }

  // const [Cover image, setCover image] = useState(undefined????);

  //
  const [ingredientsListFormInput, setIngredientsListFormInput] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  function handleIngredientsListFormInputChange(event) {
    setIngredientsListFormInput(event.target.value);
  }
  function handleIngredientsListFormInputClick() {
    setIngredientsList(
      ingredientsListFormInput !== ''
        ? [...ingredientsList, ingredientsListFormInput]
        : ingredientsList,
    );
    setIngredientsListFormInput('');
  }

  //
  const [instructionsListFormInput, setInstructionsListFormInput] = useState([]);
  const [instructionsList, setInstructionsList] = useState([]);
  function handleInstructionsListFormInputChange(event) {
    setInstructionsListFormInput(event.target.value);
  }
  function handleInstructionsListFormInputClick() {
    setInstructionsList(
      instructionsListFormInput !== ''
        ? [...instructionsList, instructionsListFormInput]
        : instructionsList,
    );
    setInstructionsListFormInput('');
  }

  //
  async function handleCreateRecipeClick() {
    try {
      await axios.post('/api/version1/recipes', {
        title: recipeTitleFormInput,
        instructionsarray: instructionsList,
        ingredientsarray: ingredientsList,
      });
    } catch (error) {
      // console.log(error);
    }
    setRecipesMade(recipesMade + 1);
  }

  function listStrings(arr) {
    return arr.map((x) => <div>{x}</div>);
  }

  return (
    <div className="RecipeCreation">

      <div className="formInputs">
        <div className="recipeTitleFormInput">
          <input
            placeholder="Name your Recipe"
            onChange={handleRecipeTitleFormInputChange}
            value={recipeTitleFormInput}
          />
        </div>
        <div className="ingredientsListFormInput">
          <input
            placeholder="Add an ingredient to the ingredients list"
            onChange={handleIngredientsListFormInputChange}
            value={ingredientsListFormInput}
          />
          <button type="button" onClick={handleIngredientsListFormInputClick}>Add</button>
        </div>
        <div className="instructionsListFormInput">
          <input
            placeholder="Add an instruction to the instructions list"
            onChange={handleInstructionsListFormInputChange}
            value={instructionsListFormInput}
          />
          <button type="button" onClick={handleInstructionsListFormInputClick}>Add</button>
        </div>
      </div>

      <h1>RECIPE PREVIEW:</h1>

      <div className="recipe-preview">
        Recipe:
        {' '}
        {recipeTitleFormInput}
        <br />
        Ingredients:
        {' '}
        {listStrings(ingredientsList)}
        <br />
        Instructions:
        {' '}
        {listStrings(instructionsList)}
      </div>

      <div className="Create Recipe">
        <button type="submit" onClick={handleCreateRecipeClick}>Create Recipe!</button>
      </div>

    </div>
  );
}

RecipeCreation.propTypes = {
  recipesMade: PropTypes.number.isRequired,
  setRecipesMade: PropTypes.func.isRequired,
};

export default RecipeCreation;
