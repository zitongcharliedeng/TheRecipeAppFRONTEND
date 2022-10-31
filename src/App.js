import React, { useEffect, useState } from "react";
import { RecipeCreation } from "./components/views/RecipeCreation";
import { Home } from "./components/views/Home";
import RecipeIndex from "./components/views/RecipeIndex";
import axios from "axios";
import SignUp from "./components/views/SignUp";

function App() {
  //SHARED

  //  HEADER

  const [sessionId, setSessionId] = useState(undefined);
  const [logInPopUp, setLogInPopUp] = useState({ html: <></> });

  // to clear login pop up each page change

  //

  function Header() {
    function handleHomePageClick() {
      setUrl("Home");
    }
    function handleRecipeCreationPageClick() {
      setUrl("RecipeCreation");
    }
    function handleRecipeIndexPageClick() {
      setUrl("RecipeIndex");
    }
    function handleSignUpPageClick() {
      setUrl("SignUp");
    }

    //login popup stuff
    function LogInPopUp() {
      const [usernameFormInput, setUsernameFormInput] = useState("");
      const [passwordFormInput, setPasswordFormInput] = useState("");

      const [flash, setFlash] = useState("");

      
      
      async function handleLogInClick() {
        try {
          const response = await axios.get("/api/version1/users", { params:
            {username: usernameFormInput, drowssap: passwordFormInput,}
            });
          console.log(response); 
          setSessionId(response.data.id)
        } catch(error) {
            console.log(error)
        }

        if (sessionId !== undefined){
          setFlash("Successful Log In");
          setLogInPopUp({ html: <></> })
        } else {
          setFlash("Unsuccessful Log In");
        }
      }

      function handleUsernameFormInputChange(event) {
        setUsernameFormInput(event.target.value);
      }

      function handlePasswordFormInputChange(event) {
        setPasswordFormInput(event.target.value);
      }

      return (
        <>
          <h1>LOGIN IN HERE:</h1>
          <div className="usernameFormInput">
            <input
              placeholder="Enter username"
              onChange={handleUsernameFormInputChange}
              value={usernameFormInput}
            />
          </div>
          <div className="passwordFormInput">
            <input
              placeholder="Put your password in"
              onChange={handlePasswordFormInputChange}
              value={passwordFormInput}
            />
          </div>
          <button onClick={handleLogInClick}>Login</button>

          <br />
          {flash}
        </>
      );
    }
    function handleLogInPopUpClick() {
      setLogInPopUp({ html: <LogInPopUp /> });
    }

    function handleLogOutClick() {
      setSessionId(undefined)
    }
    //

    return (
      <div>
        This is the header.
        <button onClick={handleHomePageClick}>Home Page</button>
        <button onClick={handleRecipeCreationPageClick}>
          Recipe Creation Page
        </button>
        <button onClick={handleRecipeIndexPageClick}>Recipe Index</button>
        Current Page View: {url} |
        {sessionId === undefined ? (
          <>
            <button onClick={handleSignUpPageClick}>Sign up here!</button>
            <button onClick={handleLogInPopUpClick}>Or log in here!</button>
          </>
        ) : (
          <>
            {`Signed in as id: ${sessionId}`}
            <button onClick={handleLogOutClick}>Or log out here!</button>
          </>
        )}
        {logInPopUp.html}
      </div>
    );
  }

  //recipesMade

  const [recipesMade, setRecipesMade] = useState(0);
  //

  //  PAGE ROUTING
  const [url, setUrl] = useState("RecipeIndex");
  var page = undefined;

  if (url === "Home") {
    page = <Home />;
  } else if (url === "RecipeCreation") {
    page = (
      (sessionId !== undefined) ? (
        <RecipeCreation
          recipesMade={recipesMade}
          setRecipesMade={setRecipesMade}
        />
      ) : ( 
        <>
          Must be logged in to create a recipe!
        </>
      )
      
      
    );
  } else if (url === "RecipeIndex") {
    page = <RecipeIndex recipesMade={recipesMade} />;
  } else if (url === "SignUp") {
    page = <SignUp />;
  }

  useEffect(() => {
    console.log("use effect called");
    axios
      .get("/api/version1/recipes")
      .then(function (response) {
        const recipes = response.data;
        console.log(recipes);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  useEffect(
    function () {
      setLogInPopUp({ html: <></> });
    },
    [url]
  );

  return (
    <div className="top-level-component">
      <Header />
      {page}
    </div>
  );
}

export default App;
