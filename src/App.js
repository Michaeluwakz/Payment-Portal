import React, { useState } from 'react';
import './App.css';
import LoginPortal from './components/LoginPortal';
import Dashboard from './components/Dashboard';
import PaymentForm from './components/PaymentForm';
import PaymentHistory from './components/PaymentHistory';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'dashboard', 'payment', 'history'
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setCurrentView('login');
  };

  const handleNavigateToPayment = () => {
    setCurrentView('payment');
  };

  const handleNavigateToHistory = () => {
    setCurrentView('history');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            userData={userData} 
            onLogout={handleLogout}
            onNavigateToPayment={handleNavigateToPayment}
            onNavigateToHistory={handleNavigateToHistory}
          />
        );
      case 'payment':
        return (
          <PaymentForm 
            onBack={handleBackToDashboard}
            userData={userData}
          />
        );
      case 'history':
        return (
          <PaymentHistory 
            onBack={handleBackToDashboard}
            userData={userData}
          />
        );
      default:
        return (
          <LoginPortal onLoginSuccess={handleLoginSuccess} />
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;
