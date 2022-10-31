import React, { useEffect, useState } from 'react'
import axios from 'axios'

function RecipeIndex(props) {
  const { recipesMade } = props;
 


  const [allRecipesObjectArray, setAllRecipesObjectArray] = useState([])

  function getRecipes(){
    axios
      .get("/api/version1/recipes")
        .then(function (response) {
          setAllRecipesObjectArray(response.data);
          console.log(response.data);
        })
          .catch(function (error) {
            console.log(error);
          });
    }

  useEffect(function(){getRecipes()}, [recipesMade])


  //it is stupid how i need to start the below fucntion with a capital letter to call it inthe recipe index return but thats react ok
  function ListAllRecipesObjectArray(){
    function ListArray(arr){
      return(
          arr.map((item) => {
            return (<div>{item}</div>)
          })
      )
    }
    
    const mapping = allRecipesObjectArray.map((object) => {
      return (
        <>
          <div className={"recipe" + object.id.toString()}>
            {/* className=`recipe{object.id}` */}
            id: {object.id} <br />
            title: {object.title} <br />
            instructions: {ListArray(object.instructions)} <br />
            ingredients: {ListArray(object.ingredients)} <br />
            created_at: {object.created_at} <br />
          </div>
        </>
      );
    });
    return mapping // IDK HOW THIS WORKS INTUITIVELY, IS THIS AN ARRAY OF <></> ELEMENTS???
  }
  //




  //

  
  

  return (
      <ListAllRecipesObjectArray/>
  );

  
}

export default RecipeIndex