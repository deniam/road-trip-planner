import React, { useState, useEffect } from 'react';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("token") != null){
        navigate('/planner')
    };
});

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, username: username })
    })
      .then(response => {
        if(response.status === 201) {
        response.json().then(data => {
          window.localStorage.setItem("token", data.token)
          navigate('/planner')
        })
        
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

    return (
      <form onSubmit={handleSubmit}>
          <input placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <input placeholder="Username" id="username" type='username' value={ username } onChange={handleUsernameChange} />
        <input id='submit' type="submit" value="Submit" />
      </form>
    );
}

export default SignUpForm;
