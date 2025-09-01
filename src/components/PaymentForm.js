import React, { useState, useEffect } from 'react';
import './PaymentForm.css';
import PaystackPayment from './PaystackPayment';

const PaymentForm = ({ onBack, userData }) => {
  const [selectedFeeType, setSelectedFeeType] = useState('tuition'); // Changed back to 'tuition'
  const [selectedTuitionItems, setSelectedTuitionItems] = useState([]); // Separate state for tuition
  const [selectedOtherItems, setSelectedOtherItems] = useState([]); // Separate state for other fees
  const [selectedSemester, setSelectedSemester] = useState('25C');
  const [amountPaying, setAmountPaying] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // 'wallet', 'card', 'both'
  const [walletAmount, setWalletAmount] = useState('');
  const [cardAmount, setCardAmount] = useState('');
  const [showPaystackModal, setShowPaystackModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const tuitionFees = [
    {
      id: 1,
      description: 'Semester Tuition',
      amount: 2043916.00
    }
  ];

  const otherFees = [
    { id: 1, description: 'HOSTEL FEE - 24A AND 24B', amount: 1363397.12 },
    { id: 2, description: 'PATHWAY FEES - POST GRADUATE', amount: 885500.00 },
    { id: 3, description: '1 COURSE FEE', amount: 200000.00 },
    { id: 4, description: '1 COURSE WAIVER FEE', amount: 200000.00 },
    { id: 5, description: '1 MODULE FEE POST GRADUATE', amount: 300000.00 },
    { id: 6, description: '2 COURSES FEE', amount: 400000.00 },
    { id: 7, description: '2 COURSES WAIVER FEE', amount: 400000.00 },
    { id: 8, description: '2 MODULES FEE POSTGRADUATE', amount: 600000.00 },
    { id: 9, description: '23A Internship Outside Abuja', amount: 0.00 },
    { id: 10, description: '23B HOSTEL', amount: 393476.88 },
    { id: 11, description: '24A TUITION FORFEITURE', amount: 500000.00 },
    { id: 12, description: '24C HOSTEL, MEDICAL AND FEEDING OF 350K', amount: 0.00 },
    { id: 13, description: '4 COURSES FEE', amount: 800000.00 },
    { id: 14, description: '6 MONTHS INTERNSHIP - ABUJA', amount: 429000.00 },
    { id: 15, description: '6 MONTHS INTERNSHIP OUTSIDE ABUJA', amount: 858000.00 },
    { id: 16, description: 'Door Replacement and Installation', amount: 30000.00 },
    { id: 17, description: 'Drug Test', amount: 20000.00 },
    { id: 18, description: 'EXTRA UNITS', amount: 200000.00 },
    { id: 19, description: 'FEE TRANSFER TO - 9880', amount: 853000.00 },
    { id: 20, description: 'FEE Transferred to 8096', amount: 875000.00 },
    { id: 21, description: 'FEE Transferred to 8758', amount: 1400000.00 },
    { id: 22, description: 'FEEDING', amount: 0.00 },
    { id: 23, description: 'Feeding', amount: 200000.00 },
    { id: 24, description: 'Feeding 100k', amount: 100000.00 },
    { id: 25, description: 'Feeding 10k', amount: 10000.00 },
    { id: 26, description: 'Feeding 20k', amount: 20000.00 },
    { id: 27, description: 'Feeding 30k', amount: 30000.00 },
    { id: 28, description: 'Feeding 350k', amount: 350000.00 },
    { id: 29, description: 'Feeding 50k', amount: 50000.00 },
    { id: 30, description: 'First semester tuition and hostel', amount: 2805309.37 },
    { id: 31, description: 'Graduation Fee', amount: 50000.00 },
    { id: 32, description: 'GRADUATION GOWN - OVERDUE CHARGES', amount: 10000.00 },
    { id: 33, description: 'HOSTEL - EXAMINATION PERIOD ONLY', amount: 150000.00 },
    { id: 34, description: 'Hostel Fee (Single Room) - BOYS', amount: 826301.44 },
    { id: 35, description: 'HOSTEL FEE BOYS - OLD RATE', amount: 413150.72 },
    { id: 36, description: 'HOSTEL FEE GIRLS - OLD RATE', amount: 413150.72 },
    { id: 37, description: 'HOSTEL FEE SEMESTER - BOYS', amount: 1084520.62 },
    { id: 38, description: 'HOSTEL FEE SEMESTER - GIRLS', amount: 1301424.78 },
    { id: 39, description: 'HOSTEL FEE TRIMESTER - BOYS', amount: 723013.76 },
    { id: 40, description: 'HOSTEL FEE TRIMESTER - GIRLS', amount: 867616.35 },
    { id: 41, description: 'HOSTEL FEE YEARLY - BOYS', amount: 2169041.24 },
    { id: 42, description: 'HOSTEL FEE YEARLY - GIRLS', amount: 2602849.56 },
    { id: 43, description: 'HOSTEL FEE YEARLY - OLD RATE', amount: 826301.44 },
    { id: 44, description: 'HOSTEL FEE YEARLY - OLD RATE GIRLS', amount: 826301.44 },
    { id: 45, description: 'HOSTEL FEE YEARLY - OLD RATE BOYS', amount: 826301.44 },
    { id: 46, description: 'HOSTEL FEE YEARLY - OLD RATE GIRLS', amount: 826301.44 },
    { id: 47, description: 'HOSTEL FEE YEARLY - OLD RATE BOYS', amount: 826301.44 },
    { id: 48, description: 'HOSTEL FEE YEARLY - OLD RATE GIRLS', amount: 826301.44 },
    { id: 49, description: 'HOSTEL FEE YEARLY - OLD RATE BOYS', amount: 826301.44 },
    { id: 50, description: 'HOSTEL FEE YEARLY - OLD RATE GIRLS', amount: 826301.44 },
    { id: 51, description: 'HOSTEL FEE YEARLY - OLD RATE BOYS', amount: 826301.44 },
    { id: 52, description: 'HOSTEL FEE YEARLY - OLD RATE GIRLS', amount: 826301.44 },
    { id: 53, description: 'HOSTEL FEE YEARLY - OLD RATE BOYS', amount: 826301.44 },
    { id: 54, description: 'HOSTEL FEE YEARLY - OLD RATE GIRLS', amount: 826301.44 },
    { id: 55, description: 'HOSTEL FEE YEARLY - OLD RATE BOYS', amount: 826301.44 },
    { id: 56, description: 'OLD HOSTEL FEE (SEMESTER) -GIRLS', amount: 743671.30 },
    { id: 57, description: 'PAYMENT OVERTRANSERED FROM 1892', amount: 187500.00 },
    { id: 58, description: 'PROJECT FEE (POSTGRADUATE)', amount: 400000.00 },
    { id: 59, description: 'PROJECT FEE (UNDERGRADUATE)', amount: 375000.00 },
    { id: 60, description: 'Re-issuing of Statement of Result', amount: 20000.00 },
    { id: 61, description: 'REMARKING', amount: 200000.00 },
    { id: 62, description: 'Retention Fee', amount: 10000.00 },
    { id: 63, description: 'SEMESTER HOSTEL - BOYS', amount: 1084520.62 },
    { id: 64, description: 'SEMESTER HOSTEL - GIRLS', amount: 1301424.78 },
    { id: 65, description: 'Transcript (eCopy)', amount: 10000.00 },
    { id: 66, description: 'Transcript 1 (INTERNATIONAL)', amount: 80000.00 },
    { id: 67, description: 'Transcript 2 (LOCAL)', amount: 30000.00 },
    { id: 68, description: 'Transcript 3', amount: 20000.00 },
    { id: 69, description: 'TRIMESTER HOSTEL - GIRLS', amount: 867616.35 },
    { id: 70, description: 'TRIMESTER HOSTEL -BOYS', amount: 723013.76 }
  ];

  // Medicals are always included regardless of fee type
  const medicalsFee = {
    id: 'medicals',
    description: 'MEDICALS',
    amount: 40000.00
  };

  const semesters = [
    { id: '25C', name: 'September 2025 (25C)', isCurrent: true },
    { id: '25B', name: 'May 2025 (25B)' },
    { id: '25A', name: 'January 2025 (25A)' },
    { id: '24C', name: 'September 2024 (24C)' },
    { id: '24B', name: 'May 2024 (24B)' },
    { id: '24A', name: 'January 2024 (24A)' },
    { id: '23C', name: 'September 2023 (23C)' },
    { id: '23B', name: 'May 2023 (23B)' },
    { id: '23A', name: 'January 2023 (23A)' }
  ];

  const handleFeeTypeChange = (feeType) => {
    setSelectedFeeType(feeType);
    // Don't clear selections - preserve them so they accumulate in the total
    setAmountPaying('');
    setWalletAmount('');
    setCardAmount('');
  };

  const handleSemesterChange = (semesterId) => {
    setSelectedSemester(semesterId);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setAmountPaying('');
    
    // Auto-populate wallet amount when selecting wallet payment methods
    if (method === 'wallet') {
      const totalDue = calculateTotalDue();
      const walletBalance = userData?.balance || 650000;
      const walletAmountToUse = Math.min(totalDue, walletBalance);
      setWalletAmount(walletAmountToUse.toFixed(2));
      setCardAmount('');
    } else if (method === 'both') {
      const totalDue = calculateTotalDue();
      const walletBalance = userData?.balance || 650000;
      const walletAmountToUse = Math.min(totalDue, walletBalance);
      setWalletAmount(walletAmountToUse.toFixed(2));
      const remainingAmount = Math.max(0, totalDue - walletAmountToUse);
      setCardAmount(remainingAmount.toFixed(2));
    } else {
      // Card payment - clear wallet amount
      setWalletAmount('');
      setCardAmount('');
    }
  };

  const handleWalletAmountChange = (e) => {
    const value = e.target.value;
    setWalletAmount(value);
    
    if (paymentMethod === 'both') {
      const totalDue = calculateTotalDue();
      const walletAmountNum = parseFloat(value) || 0;
      const remainingAmount = Math.max(0, totalDue - walletAmountNum);
      setCardAmount(remainingAmount.toFixed(2));
    }
  };

  const handleCardAmountChange = (e) => {
    const value = e.target.value;
    setCardAmount(value);
    
    if (paymentMethod === 'both') {
      const totalDue = calculateTotalDue();
      const cardAmountNum = parseFloat(value) || 0;
      const remainingAmount = Math.max(0, totalDue - cardAmountNum);
      setWalletAmount(remainingAmount.toFixed(2));
    }
  };

  const calculateSelectedTotal = () => {
    // Always include both tuition and other fees selections regardless of current tab
    const tuitionTotal = tuitionFees
      .filter(item => selectedTuitionItems.includes(item.id))
      .reduce((total, item) => total + item.amount, 0);
    
    const otherFeesTotal = otherFees
      .filter(item => selectedOtherItems.includes(item.id))
      .reduce((total, item) => total + item.amount, 0);
    
    return tuitionTotal + otherFeesTotal;
  };

  const calculateTotalDue = () => {
    const selectedTotal = calculateSelectedTotal();
    return selectedTotal + medicalsFee.amount;
  };

  const calculateWalletBalanceAfterPayment = () => {
    const walletAmountNum = parseFloat(walletAmount) || 0;
    const walletBalance = userData?.balance || 650000;
    return walletBalance - walletAmountNum;
  };

  const validatePayment = () => {
    if (selectedTuitionItems.length === 0 && selectedOtherItems.length === 0) {
      alert('Please select at least one item from Tuition Fee or Other Fees.');
      return false;
    }
    if (!selectedSemester) {
      alert('Please select a semester.');
      return false;
    }

    const totalDue = calculateTotalDue();
    let totalAmount = 0;

    if (paymentMethod === 'wallet') {
      const walletAmountNum = parseFloat(walletAmount) || 0;
      if (walletAmountNum <= 0) {
        alert('Please enter a valid wallet amount.');
        return false;
      }
      if (walletAmountNum > totalDue) {
        alert('Wallet amount cannot exceed the total amount due.');
        return false;
      }
      totalAmount = walletAmountNum;
    } else if (paymentMethod === 'card') {
      const cardAmountNum = parseFloat(cardAmount) || 0;
      if (cardAmountNum <= 0) {
        alert('Please enter a valid card amount.');
        return false;
      }
      if (cardAmountNum > totalDue) {
        alert('Card amount cannot exceed the total amount due.');
        return false;
      }
      totalAmount = cardAmountNum;
    } else if (paymentMethod === 'both') {
      const walletAmountNum = parseFloat(walletAmount) || 0;
      const cardAmountNum = parseFloat(cardAmount) || 0;
      if (walletAmountNum <= 0 && cardAmountNum <= 0) {
        alert('Please enter valid amounts for wallet and/or card.');
        return false;
      }
      totalAmount = walletAmountNum + cardAmountNum;
      if (Math.abs(totalAmount - totalDue) > 0.01) {
        alert('The sum of wallet and card amounts must equal the total amount due.');
        return false;
      }
    }

    return true;
  };

  const handlePayment = () => {
    if (!validatePayment()) {
      return;
    }

    const totalDue = calculateTotalDue();
    const walletAmountNum = parseFloat(walletAmount) || 0;
    const cardAmountNum = parseFloat(cardAmount) || 0;
    const walletBalance = userData?.balance || 650000;
    const newWalletBalance = calculateWalletBalanceAfterPayment();

    if (walletAmountNum > walletBalance) {
      alert('Insufficient wallet balance for this payment.');
      return;
    }

    console.log('Processing payment:', {
      feeType: selectedFeeType,
      semester: selectedSemester,
      tuitionItems: selectedTuitionItems,
      otherItems: selectedOtherItems,
      totalDue: totalDue,
      paymentMethod: paymentMethod,
      walletAmount: walletAmountNum,
      cardAmount: cardAmountNum,
      newWalletBalance: newWalletBalance
    });

    // Show Paystack payment modal
    setShowPaystackModal(true);
  };

  const currentFees = selectedFeeType === 'tuition' ? tuitionFees : otherFees;

  const selectedTotal = calculateSelectedTotal();
  const totalDue = calculateTotalDue();
  const selectedSemesterName = semesters.find(s => s.id === selectedSemester)?.name || '';
  const walletBalance = userData?.balance || 650000;

  // Helper function to get the appropriate fee type for an item
  const getItemFeeType = (itemId) => {
    if (tuitionFees.find(fee => fee.id === itemId)) return 'tuition';
    if (otherFees.find(fee => fee.id === itemId)) return 'other';
    return null;
  };

  // Helper function to check if an item is selected
  const isItemSelected = (itemId) => {
    const feeType = getItemFeeType(itemId);
    if (feeType === 'tuition') {
      return selectedTuitionItems.includes(itemId);
    } else if (feeType === 'other') {
      return selectedOtherItems.includes(itemId);
    }
    return false;
  };

  // Helper function to handle item selection
  const handleItemSelection = (itemId) => {
    const feeType = getItemFeeType(itemId);
    
    if (feeType === 'tuition') {
      // For tuition fees, only one item can be selected (radio button behavior)
      setSelectedTuitionItems([itemId]);
    } else if (feeType === 'other') {
      // For other fees, multiple items can be selected (checkbox behavior)
      if (selectedOtherItems.includes(itemId)) {
        setSelectedOtherItems(selectedOtherItems.filter(id => id !== itemId));
      } else {
        setSelectedOtherItems([...selectedOtherItems, itemId]);
      }
    }
    
    setAmountPaying('');
    setWalletAmount('');
    setCardAmount('');
  };

  // Auto-update wallet amount when selections change
  useEffect(() => {
    if (paymentMethod === 'wallet' || paymentMethod === 'both') {
      const totalDue = calculateTotalDue();
      const walletBalance = userData?.balance || 650000;
      const walletAmountToUse = Math.min(totalDue, walletBalance);
      setWalletAmount(walletAmountToUse.toFixed(2));
      
      if (paymentMethod === 'both') {
        const remainingAmount = Math.max(0, totalDue - walletAmountToUse);
        setCardAmount(remainingAmount.toFixed(2));
      }
    }
  }, [selectedTuitionItems, selectedOtherItems, paymentMethod, userData?.balance]);

  return (
    <div className="payment-form-container">
      {/* Header */}
      <header className="payment-header">
        <button onClick={onBack} className="back-btn">
          <i className="bi bi-arrow-left"></i>
          Back to Dashboard
        </button>
        <h1 className="payment-title">Payment Form</h1>
      </header>

      {/* Main Payment Form */}
      <div className="payment-form-card">
        {/* Fee Type Selection */}
        <div className="fee-type-selector">
          <button
            className={`fee-type-btn ${selectedFeeType === 'tuition' ? 'active' : ''}`}
            onClick={() => handleFeeTypeChange('tuition')}
          >
            Tuition Fee
          </button>
          <button
            className={`fee-type-btn ${selectedFeeType === 'other' ? 'active' : ''}`}
            onClick={() => handleFeeTypeChange('other')}
          >
            Other Fees
          </button>
        </div>

        {/* Payment Details Table */}
        <div className="payment-table-section">
          <table className="payment-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFees.map((item) => {
                const feeType = getItemFeeType(item.id);
                const isSelected = isItemSelected(item.id);
                
                return (
                  <tr key={item.id} className={item.id % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                    <td className="amount-cell">₦{item.amount.toLocaleString()}.00</td>
                    <td className="action-cell">
                      {feeType === 'tuition' ? (
                        <>
                          <input
                            type="radio"
                            name="paymentItem"
                            id={`item-${item.id}`}
                            checked={isSelected}
                            onChange={() => handleItemSelection(item.id)}
                            className="payment-radio"
                          />
                          <label htmlFor={`item-${item.id}`} className="radio-label"></label>
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            name="paymentItem"
                            id={`item-${item.id}`}
                            checked={isSelected}
                            onChange={() => handleItemSelection(item.id)}
                            className="payment-checkbox"
                          />
                          <label htmlFor={`item-${item.id}`} className="checkbox-label"></label>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Payment Items Section */}
        <div className="payment-items-section">
          <h3 className="section-title">Payment Items</h3>
          <div className="payment-items-grid">
            {/* Show Tuition Items */}
            {selectedTuitionItems.length > 0 && (
              <>
                {selectedTuitionItems.map((itemId) => {
                  const item = tuitionFees.find(fee => fee.id === itemId);
                  return item ? (
                    <div key={`tuition-${item.id}`} className="payment-item tuition-item">
                      <span className="item-label">Tuition Item:</span>
                      <span className="item-value">{item.description}</span>
                    </div>
                  ) : null;
                })}
                {selectedTuitionItems.map((itemId) => {
                  const item = tuitionFees.find(fee => fee.id === itemId);
                  return item ? (
                    <div key={`tuition-amount-${item.id}`} className="payment-item tuition-item">
                      <span className="item-label">Tuition Amount:</span>
                      <span className="item-value">₦{item.amount.toLocaleString()}.00</span>
                    </div>
                  ) : null;
                })}
              </>
            )}

            {/* Show Other Fees Items */}
            {selectedOtherItems.length > 0 && (
              <>
                {selectedOtherItems.map((itemId) => {
                  const item = otherFees.find(fee => fee.id === itemId);
                  return item ? (
                    <div key={`other-${item.id}`} className="payment-item other-item">
                      <span className="item-label">Other Fee Item:</span>
                      <span className="item-value">{item.description}</span>
                    </div>
                  ) : null;
                })}
                {selectedOtherItems.map((itemId) => {
                  const item = otherFees.find(fee => fee.id === itemId);
                  return item ? (
                    <div key={`other-amount-${item.id}`} className="payment-item other-item">
                      <span className="item-label">Other Fee Amount:</span>
                      <span className="item-value">₦{item.amount.toLocaleString()}.00</span>
                    </div>
                  ) : null;
                })}
              </>
            )}

            {/* Show No Items Selected Message */}
            {selectedTuitionItems.length === 0 && selectedOtherItems.length === 0 && (
              <>
                <div className="payment-item">
                  <span className="item-label">Item:</span>
                  <span className="item-value">No items selected</span>
                </div>
                <div className="payment-item">
                  <span className="item-label">Amount:</span>
                  <span className="item-value">₦0.00</span>
                </div>
              </>
            )}

            {/* Total Section */}
            <div className="payment-item total">
              <span className="item-label">Item(s) Total:</span>
              <span className="item-value">₦{selectedTotal.toLocaleString()}.00</span>
            </div>
            <div className="payment-item medicals-item">
              <span className="item-label">Medicals (Always Included):</span>
              <span className="item-value">₦{medicalsFee.amount.toLocaleString()}.00</span>
            </div>
            <div className="payment-item total">
              <span className="item-label">Amount Due:</span>
              <span className="item-value">₦{totalDue.toLocaleString()}.00</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="payment-method-section">
          <h3 className="section-title">Payment Method</h3>
          <div className="payment-method-options">
            <label className="payment-method-option">
              <input
                type="radio"
                name="paymentMethod"
                value="wallet"
                checked={paymentMethod === 'wallet'}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
                className="method-radio"
              />
              <span className="method-label">Pay with Wallet</span>
            </label>
            
            <label className="payment-method-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
                className="method-radio"
              />
              <span className="method-label">Pay with Card</span>
            </label>
            
            <label className="payment-method-option">
              <input
                type="radio"
                name="paymentMethod"
                value="both"
                checked={paymentMethod === 'both'}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
                className="method-radio"
              />
              <span className="method-label">Pay with Both (Wallet + Card)</span>
            </label>
          </div>
        </div>

        {/* Payment Amount Inputs */}
        <div className="payment-amounts-section">
          {paymentMethod === 'wallet' && (
            <div className="amount-input-row">
              <label htmlFor="walletAmount" className="amount-label">Amount from Wallet:</label>
              <div className="amount-input-field">
                <input
                  type="number"
                  id="walletAmount"
                  value={walletAmount}
                  onChange={handleWalletAmountChange}
                  placeholder="Enter amount to pay from wallet"
                  className="amount-input"
                  min="0"
                  max={Math.min(totalDue, walletBalance)}
                  step="0.01"
                />
                <span className="wallet-balance">Available: ₦{walletBalance.toLocaleString()}.00</span>
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="amount-input-row">
              <label htmlFor="cardAmount" className="amount-label">Amount from Card:</label>
              <div className="amount-input-field">
                <input
                  type="number"
                  id="cardAmount"
                  value={cardAmount}
                  onChange={handleCardAmountChange}
                  placeholder="Enter amount to pay with card"
                  className="amount-input"
                  min="0"
                  max={totalDue}
                  step="0.01"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'both' && (
            <>
              <div className="amount-input-row">
                <label htmlFor="walletAmount" className="amount-label">Amount from Wallet:</label>
                <div className="amount-input-field">
                  <input
                    type="number"
                    id="walletAmount"
                    value={walletAmount}
                    onChange={handleWalletAmountChange}
                    placeholder="Enter amount to pay from wallet"
                    className="amount-input"
                    min="0"
                    max={Math.min(totalDue, walletBalance)}
                    step="0.01"
                  />
                  <span className="wallet-balance">Available: ₦{walletBalance.toLocaleString()}.00</span>
                </div>
              </div>
              
              <div className="amount-input-row">
                <label htmlFor="cardAmount" className="amount-label">Amount from Card:</label>
                <div className="amount-input-field">
                  <input
                    type="number"
                    id="cardAmount"
                    value={cardAmount}
                    onChange={handleCardAmountChange}
                    placeholder="Enter amount to pay with card"
                    className="amount-input"
                    min="0"
                    max={totalDue}
                    step="0.01"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Input Fields Section */}
        <div className="input-fields-section">
          <div className="input-row">
            <label htmlFor="semester" className="input-label">School Semester</label>
            <div className="input-field">
              <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => handleSemesterChange(e.target.value)}
                className="semester-select"
              >
                {semesters.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="payment-action">
          <button 
            onClick={handlePayment} 
            className="pay-now-btn"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Decorative Paper Airplane */}
      <div className="paper-airplane">
        <div className="airplane-icon">✈️</div>
        <div className="airplane-line">~</div>
      </div>

      {/* Paystack Payment Modal */}
      <PaystackPayment
        isOpen={showPaystackModal}
        onClose={() => setShowPaystackModal(false)}
        paymentData={{
          feeType: selectedFeeType,
          semester: selectedSemester,
          tuitionItems: selectedTuitionItems,
          otherItems: selectedOtherItems,
          totalDue: totalDue,
          paymentMethod: paymentMethod,
          walletAmount: parseFloat(walletAmount) || 0,
          cardAmount: parseFloat(cardAmount) || 0
        }}
        userData={userData}
        onPaymentSuccess={(result) => {
          console.log('Payment success:', result);
          setShowPaystackModal(false);
          // Handle successful payment - you can add success notification here
          alert(`Payment initiated successfully! Reference: ${result.reference}`);
        }}
        onPaymentError={(error) => {
          console.error('Payment error:', error);
          setShowPaystackModal(false);
          // Handle payment error - you can add error notification here
          alert(`Payment failed: ${error.message}`);
        }}
      />
    </div>
  );
};

export default PaymentForm;
