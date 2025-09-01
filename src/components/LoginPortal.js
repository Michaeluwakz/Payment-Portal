import React, { useState } from 'react';
import './LoginPortal.css';

const LoginPortal = ({ onLoginSuccess }) => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    applicationId: '',
    studentId: '',
    email: ''
  });

  const handleUserTypeChange = (e) => {
    const selectedType = e.target.value;
    setUserType(selectedType);
    setFormData({
      applicationId: '',
      studentId: '',
      email: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create user data based on the form submission
    const userData = {
      userType,
      ...formData,
      // Mock data for demonstration
      name: 'Chidubem Michael Uwakwe',
      studentId: userType === 'new-student' ? formData.applicationId : formData.studentId,
      course: 'B.SC SOFTWARE ENGINEERING',
      balance: 650000.00
    };
    
    console.log('Form submitted:', userData);
    
    // Call the login success handler
    onLoginSuccess(userData);
  };

  const getInstructions = () => {
    if (!userType) {
      return ['Select the user type to see the instruction(s)'];
    }
    
    if (userType === 'new-student') {
      return [
        'Use the last four digit of your application as the Application ID',
        'Use your registered email address'
      ];
    }
    
    if (userType === 'returning-student') {
      return [
        'Enter your Student ID',
        'Enter your University Email Address'
      ];
    }
    
    return [];
  };

  return (
    <div className="portal-container">
      {/* Header Section */}
      <header className="portal-header">
        <h1 className="portal-title">Baze University Payment Portal</h1>
        <div className="logo-container">
          <img 
            src="https://i.ibb.co/TDwdkMLY/Untitled-design.png" 
            alt="Baze University Logo" 
            className="university-logo-img"
          />
        </div>
      </header>

      {/* Main Login Card */}
      <main className="login-card">
        <h2 className="login-title">Login here</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          {/* User Type Selection */}
          <div className="form-group">
            <label htmlFor="userType" className="form-label">User Type</label>
            <select
              id="userType"
              name="userType"
              className="form-select"
              value={userType}
              onChange={handleUserTypeChange}
              required
            >
              <option value="">Select Option</option>
              <option value="new-student">New Student</option>
              <option value="returning-student">Returning Student</option>
            </select>
          </div>

          {/* Dynamic Form Fields */}
          <div className="dynamic-fields">
            {userType === 'new-student' && (
              <>
                <div className="form-group">
                  <label htmlFor="applicationId" className="form-label">Your Application ID</label>
                  <input
                    type="text"
                    id="applicationId"
                    name="applicationId"
                    className="form-input"
                    placeholder="Your Application ID"
                    value={formData.applicationId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your registered email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {userType === 'returning-student' && (
              <>
                <div className="form-group">
                  <label htmlFor="studentId" className="form-label">Your Student ID</label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    className="form-input"
                    placeholder="Your Student ID"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your university email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}
          </div>

          {/* Sign In Button */}
          <button type="submit" className="signin-btn">Sign in</button>
        </form>

        {/* Instructions Section - Integrated within the card */}
        <div className="instructions-section">
          <h3 className="instructions-title">Instruction</h3>
          <div className="instructions-list">
            {getInstructions().map((instruction, index) => (
              <div key={index} className="instruction-item">
                <span className="checkmark">✓</span>
                <span className="instruction-text">{instruction}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPortal;
