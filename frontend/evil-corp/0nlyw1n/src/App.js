import React from 'react';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="logo">0nlyw1n</div>
      <LoginForm />
      <div className="footer">
        <a className="link" href="#">Privacy Policy</a> | <a className="link" href="#">Terms of Service</a> | <a className="link" href="#">Contact</a>
      </div>
    </div>
  );
}

export default App;
