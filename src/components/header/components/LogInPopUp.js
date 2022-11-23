import { useState, React } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function LogInPopUp(props) {
  const { setSessionId, setLogInPopUp } = props;
  const [usernameFormInput, setUsernameFormInput] = useState('');
  const [passwordFormInput, setPasswordFormInput] = useState('');
  const [flash, setFlash] = useState('');

  async function handleLogInClick() {
    try {
      const response = await axios.get('/users', {
        params:
        { username: usernameFormInput, drowssap: passwordFormInput },
      });
      console.log(response);
      setSessionId(response.data.id); // TODO: implement secure login unpredictable session ids
      if (response.data === null) {
        setSessionId(0);
        setFlash('Unsuccessful Log In');
      } else {
        setLogInPopUp({ html: <>Blank</> });
      }
    } catch (error) {
      // console.log(error);
    }
  }

  function handleUsernameFormInputChange(event) {
    setUsernameFormInput(event.target.value);
  }

  function handlePasswordFormInputChange(event) {
    setPasswordFormInput(event.target.value);
  }

  return (
    <div className="loginbox">
      LOGIN IN HERE:
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
      <button type="submit" onClick={handleLogInClick}>Login</button>

      <br />
      {flash}
    </div>
  );
}

LogInPopUp.propTypes = {
  setSessionId: PropTypes.func.isRequired,
  setLogInPopUp: PropTypes.func.isRequired,
};

export default LogInPopUp;
