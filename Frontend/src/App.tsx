import React, { useState } from 'react';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Admin from './Pages/Admin';

const App = () => {
  // 1. Initializing state from localStorage
  const [userrole, setuserrole] = useState<string | null>(() => {
    return localStorage.getItem('userrole');
  });

  const handleLoginSuccess = (token: string, role: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userrole', role); // Consistently use 'userrole'
    setuserrole(role);
  };

  const handleLogout = () => {
    localStorage.clear(); 
    setuserrole(null);
    // Optional: Force a refresh to clean up any cached state/data
    // window.location.href = '/'; 
  };

  return (
    <div className="app-container">
      {!userrole ? (
        // User is not logged in
        <Welcome onAuthSuccess={handleLoginSuccess} />
      ) : userrole.toUpperCase() === 'ADMIN' ? ( // 2. Case-insensitive check
        // User is an Admin
        <Admin onLogout={handleLogout}/>
      ) : (
        // User is a regular Customer
        <Home onLogout={handleLogout}/>
      )}
    </div>
  );
};

export default App;