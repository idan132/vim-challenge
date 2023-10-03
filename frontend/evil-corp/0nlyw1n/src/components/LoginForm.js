import React, { useState } from 'react';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    const response = await fetch('https://vim-challenge.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),  // 'username' and 'password' should be defined here
    });

    if (!response.ok) {
      setErrorMessage('Failed to login. Please try again.');
    } else {
      const responseBody = await response.json();  // Parse the response body as JSON
      const next = responseBody.link;  // Access the 'link' property from the parsed response body
      console.log(next); 
      window.location.href = `${next}`;
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input type="text" className="form-field" name="username" placeholder="Username" required />
      <input type="password" className="form-field" name="password" placeholder="Password" required />
      <button type="submit" className="login-btn">Login</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
}

export default LoginForm;
