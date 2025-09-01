import React from 'react';
import './Dashboard.css';

const Dashboard = ({ userData, onLogout, onNavigateToPayment, onNavigateToHistory }) => {
  const handlePayNow = () => {
    // Navigate to payment form
    onNavigateToPayment();
  };

  const handleViewHistory = () => {
    // Navigate to payment history
    onNavigateToHistory();
  };

  return (
    <div className="dashboard-container">
      {/* Top Centered Text Section */}
      <div className="top-text-section">
        <div className="top-text-container">
          <h1 className="top-text dashboard-text">Dashboard</h1>
          <h1 className="top-text payment-text">Payment Form</h1>
        </div>
      </div>

      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="university-logo">
            <img 
              src="https://i.ibb.co/TDwdkMLY/Untitled-design.png" 
              alt="Baze University Logo" 
              className="university-logo-img"
            />
          </div>
        </div>
        
        <nav className="header-nav">
          <a href="#dashboard" className="nav-link active">Dashboard</a>
          <a href="#pay" className="nav-link" onClick={handlePayNow}>Pay Now</a>
          <a href="#history" className="nav-link" onClick={handleViewHistory}>Payment History</a>
        </nav>
        
        <div className="header-right">
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <h1 className="welcome-title">Welcome to Baze University Payment Portal</h1>
        
        {/* Information Cards */}
        <div className="cards-container">
          {/* User Profile Card */}
          <div className="info-card">
            <div className="card-icon">
              <i className="bi bi-person-circle"></i>
            </div>
            <div className="card-content">
              <h3 className="card-name">{userData?.name || 'Chidubem Michael Uwakwe'}</h3>
              <p className="card-id">{userData?.studentId || 'BU/25A/IT/11894'}</p>
              <div className="course-info">
                <span className="course-label">Course:</span>
                <span className="course-name">{userData?.course || 'B.SC SOFTWARE ENGINEERING'}</span>
              </div>
            </div>
          </div>

          {/* Wallet Balance Card */}
          <div className="info-card">
            <div className="card-icon">
              <i className="bi bi-currency-exchange"></i>
            </div>
            <div className="card-content">
              <h3 className="card-title">Wallet Balance</h3>
              <p className="balance-amount">NGN {(userData?.balance || 650000).toLocaleString()}.00</p>
            </div>
          </div>

          {/* Pay Now Card */}
          <div className="info-card">
            <div className="card-icon">
              <i className="bi bi-currency-exchange"></i>
            </div>
            <div className="card-content">
              <h3 className="card-title">Pay Now</h3>
              <button onClick={handlePayNow} className="pay-now-btn">
                <span className="dollar-symbol">$</span>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
