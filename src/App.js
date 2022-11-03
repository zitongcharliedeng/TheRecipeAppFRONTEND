import React, { useState } from 'react';
import RecipeCreation from './components/views/recipecreation/components/RecipeCreation';
import Home from './components/views/Home';
import RecipeIndex from './components/views/RecipeIndex';
import SignUp from './components/views/SignUp';
import Header from './components/header/Header';

function App() {
  const [sessionId, setSessionId] = useState(0);
  const [recipesMade, setRecipesMade] = useState(0);

  //  PAGE ROUTING
  const [url, setUrl] = useState('RecipeIndex');
  let page;

  if (url === 'Home') {
    // eslint-disable-next-line react/jsx-filename-extension
    page = <Home />;
  } else if (url === 'RecipeCreation') {
    page = sessionId !== 0 ? (
      <RecipeCreation
        recipesMade={recipesMade}
        setRecipesMade={setRecipesMade}
      />
    ) : (
      <>Must be logged in to create a recipe!</>
    );
  } else if (url === 'RecipeIndex') {
    page = <RecipeIndex recipesMade={recipesMade} />;
  } else if (url === 'SignUp') {
    page = <SignUp />;
  } else if (url === 'Blank') {
    page = <>Blank Page</>;
  }

  return (
    <div className="top-level-component">
      <Header url={url} setUrl={setUrl} sessionId={sessionId} setSessionId={setSessionId} />
      {page}
    </div>
  );
}

export default App;
