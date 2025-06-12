import React, { useState } from 'react';
import logos from './assets/logo.png';

function LoginPage({ onLogin }) {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleShowForm = (role) => {
    setRole(role);
    setShowForm(true);
    setLoginError('');
  };

  const handleLogin = () => {
    if (role === 'user' && username === 'user' && password === 'user123') {
      onLogin('discover', false);
      setShowForm(false);
    } else if (role === 'admin' && username === 'admin' && password === 'admin123') {
      onLogin('admin', true);
      setShowForm(false);
    } else {
      setLoginError('Incorrect username or password');
    }
  };

  // Function to reset form fields using onReset
  const handleReset = () => {
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  return (
    <div className="login-page">
      <img src={logos} alt="App Logo" className="app-logo" />
      <h1>Login</h1>

      {showForm ? (
        <form
          onSubmit={(e) => e.preventDefault()} // Prevent form submit
          onReset={handleReset} // This will be triggered when the reset button is clicked
          className="login-form"
        >
          <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>Login</button>
          {/* Reset Button that triggers onReset */}
          <button type="reset">Reset</button> 
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </form>
      ) : (
        <>
          <button onClick={() => handleShowForm('user')}>Login as User</button>
          <button onClick={() => handleShowForm('admin')}>Login as Admin</button>
        </>
      )}
    </div>
  );
}

export default LoginPage;
