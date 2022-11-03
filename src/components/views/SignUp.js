import axios from 'axios';
import React, { useState } from 'react';

function SignUp() {
  const [usernameFormInput, setUsernameFormInput] = useState('');
  const [passwordFormInput, setPasswordFormInput] = useState('');

  const [flash, setFlash] = useState('');

  async function handleSignUpClick() {
    try {
      const response = await axios.post('/api/version1/users', {
        username: usernameFormInput,
        drowssap: passwordFormInput,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setFlash('FLASH: ACCOUNT CREATED. LOGIN AT THE TOP.');
  }

  function handleUsernameFormInputChange(event) {
    setUsernameFormInput(event.target.value);
  }

  function handlePasswordFormInputChange(event) {
    setPasswordFormInput(event.target.value);
  }

  return (
    <div className="SignUp">
      <h1>SIGN UP HERE:</h1>
      <div className="usernameFormInput">
        <input
          placeholder="Choose your username"
          onChange={handleUsernameFormInputChange}
          value={usernameFormInput}
        />
      </div>
      <div className="passwordFormInput">
        <input
          placeholder="Put in a password too"
          onChange={handlePasswordFormInputChange}
          value={passwordFormInput}
        />
      </div>
      <button type="button" onClick={handleSignUpClick}>Add</button>

      <br />
      {flash}
    </div>
  );
}

export default SignUp;
