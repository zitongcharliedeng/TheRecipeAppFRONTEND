import { useEffect, useState, React } from 'react';
import PropTypes from 'prop-types';
import LogInPopUp from './components/LogInPopUp';
// to clear login pop up each page change

function Header(props) {
  const {
    url, setUrl, sessionId, setSessionId,
  } = props;
  const [logInPopUp, setLogInPopUp] = useState({ html: <>Blank</> });

  function handleHomePageClick() {
    setUrl('Home');
  }
  function handleRecipeCreationPageClick() {
    setUrl('RecipeCreation');
  }
  function handleRecipeIndexPageClick() {
    setUrl('RecipeIndex');
  }
  function handleSignUpPageClick() {
    setUrl('SignUp');
  }

  // login popup stuff

  useEffect(
    () => {
      setLogInPopUp({ html: <>Blank login popup</> });
    },
    [url],
  );

  function handleLogInPopUpClick() {
    setLogInPopUp(
      { html: <LogInPopUp setLogInPopUp={setLogInPopUp} setSessionId={setSessionId} /> },
    );
  }

  function handleLogOutClick() {
    setSessionId(0);
  }
  //

  return (
    <div className="header">
      <div className="navlinks">
        <button type="button" onClick={handleHomePageClick}>Home Page</button>
        <button type="button" onClick={handleRecipeCreationPageClick}>
          Recipe Creation Page
        </button>
        <button type="button" onClick={handleRecipeIndexPageClick}>Recipe Index</button>
      </div>
      <div className="currentpageview">
        Current Page View:
        {url}
      </div>
      {sessionId === 0 ? (
        <div className="signedoutbox">
          <button type="button" onClick={handleSignUpPageClick}>Sign up here!</button>
          <button type="button" onClick={handleLogInPopUpClick}>Or log in here!</button>
          {logInPopUp.html}
        </div>
      ) : (
        <div className="signedinbox">
          {`Signed in as id: ${sessionId}`}
          <button type="button" onClick={handleLogOutClick}>Log out</button>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  sessionId: PropTypes.number.isRequired,
  setSessionId: PropTypes.func.isRequired,
};

export default Header;
