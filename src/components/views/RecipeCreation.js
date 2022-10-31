import axios from "axios";
import { useState } from "react";


export function RecipeCreation(props) {
  const { recipesMade, setRecipesMade } = props;

  //   RECIPE CREATION PROPS
  const [recipeTitleFormInput, setRecipeTitleFormInput] = useState("");
  function handleRecipeTitleFormInputChange(event) {
    setRecipeTitleFormInput(event.target.value);
  }

  //const [Cover image, setCover image] = useState(undefined????);

  //
  const [ingredientsListFormInput, setIngredientsListFormInput] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  function handleIngredientsListFormInputChange(event) {
    setIngredientsListFormInput(event.target.value);
  }
  function handleIngredientsListFormInputClick() {
    setIngredientsList(
      ingredientsListFormInput !== ""
        ? [...ingredientsList, ingredientsListFormInput]
        : ingredientsList
    );
    setIngredientsListFormInput("");
  }

  //
  const [instructionsListFormInput, setInstructionsListFormInput] = useState([]);
  const [instructionsList, setInstructionsList] = useState([]);
  function handleInstructionsListFormInputChange(event) {
    setInstructionsListFormInput(event.target.value);
  }
  function handleInstructionsListFormInputClick() {
    setInstructionsList(
      instructionsListFormInput !== ""
        ? [...instructionsList, instructionsListFormInput]
        : instructionsList
    );
    setInstructionsListFormInput("");
  }

  //
  async function handleCreateRecipeClick() {

      //I NEED TO TURN THE LISTS OF INSTRUCTIONS AND INGREDIENTS INTO ONE LONG STRING SINCE SQL ACTIVE RECORD DATA TYPE IS STRING/TEXT, ARRAY NOT A DATA TYPE






    try {
      const response = await axios.post("/api/version1/recipes", {
      title: recipeTitleFormInput,
      instructionsarray: instructionsList,
      ingredientsarray: ingredientsList,
      })
      console.log(response)
    } catch(error) {
      console.log(error)
    }
    setRecipesMade(recipesMade + 1)
  }

  function listStrings(arr) {
    return arr.map((x) => {
      return <div>{x}</div>;
    });
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
          <button onClick={handleIngredientsListFormInputClick}>Add</button>
        </div>
        <div className="instructionsListFormInput">
          <input
            placeholder="Add an instruction to the instructions list"
            onChange={handleInstructionsListFormInputChange}
            value={instructionsListFormInput}
          />
          <button onClick={handleInstructionsListFormInputClick}>Add</button>
        </div>
      </div>


      <h1>RECIPE PREVIEW:</h1>

      <div className="recipe-preview">
        Recipe: {recipeTitleFormInput}
        <br />
        Ingredients: {listStrings(ingredientsList)}
        <br />
        Instructions: {listStrings(instructionsList)}
      </div>

      <div className="Create Recipe">
        <button onClick={handleCreateRecipeClick}>Create Recipe!</button>
      </div>


    </div>
  );
}

