import React, { useState, useEffect } from 'react';
import './PaystackPayment.css';
import paystackService from '../services/paystackService';

const PaystackPayment = ({ 
  isOpen, 
  onClose, 
  paymentData, 
  userData, 
  onPaymentSuccess,
  onPaymentError 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isOpen && userData) {
      // Set default email from user data or use a placeholder
      setEmail(userData.email || 'student@bazeuniversity.edu.ng');
    }
  }, [isOpen, userData]);

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
      setError(null);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProceedToPayment = async () => {
    try {
      setError(null);
      
      // Validate email
      if (!email || !validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      setIsProcessing(true);

      // Generate unique reference
      const reference = paystackService.generateReference();

      // Create detailed payment description
      const createPaymentDescription = () => {
        const items = [];
        
        // Add tuition items
        if (paymentData.tuitionItems && paymentData.tuitionItems.length > 0) {
          const tuitionFees = [
            { id: 1, description: 'Semester Tuition', amount: 2043916.00 }
          ];
          paymentData.tuitionItems.forEach(itemId => {
            const item = tuitionFees.find(fee => fee.id === itemId);
            if (item) {
              items.push(`${item.description} (₦${item.amount.toLocaleString()})`);
            }
          });
        }
        
        // Add other fee items
        if (paymentData.otherItems && paymentData.otherItems.length > 0) {
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
          paymentData.otherItems.forEach(itemId => {
            const item = otherFees.find(fee => fee.id === itemId);
            if (item) {
              items.push(`${item.description} (₦${item.amount.toLocaleString()})`);
            }
          });
        }
        
        // Always include medicals
        items.push('MEDICALS (₦40,000)');
        
        return items.join(', ');
      };

      // Prepare payment data
      const paymentConfig = {
        email: email,
        amount: paymentData.cardAmount || paymentData.totalDue,
        reference: reference,
        callback_url: `${window.location.origin}/payment-success?ref=${reference}`,
        metadata: {
          // Only send minimal information to Paystack
          reference: reference,
          amount: paymentData.cardAmount || paymentData.totalDue
        }
      };

      // Initialize Paystack payment
      const result = await paystackService.initializePayment(paymentConfig);
      
      if (result.success) {
        // Payment modal opened successfully
        console.log('Paystack payment initialized:', result);
        
        // Save detailed payment record to localStorage (separate from Paystack data)
        const detailedPaymentRecord = {
          ref: reference,
          amount: paymentData.cardAmount || paymentData.totalDue,
          metadata: {
            // Store detailed information locally only
            student_id: userData?.studentId || 'N/A',
            student_name: userData?.name || 'N/A',
            course: userData?.course || 'N/A',
            semester: paymentData.semester,
            fee_type: paymentData.feeType,
            tuition_items: paymentData.tuitionItems,
            other_items: paymentData.otherItems,
            wallet_amount: paymentData.walletAmount || 0,
            card_amount: paymentData.cardAmount || 0,
            total_due: paymentData.totalDue,
            payment_method: paymentData.paymentMethod,
            payment_description: createPaymentDescription()
          }
        };
        
        paystackService.savePaymentRecord(detailedPaymentRecord, 'pending');
        
        // Close our modal since Paystack will handle the payment flow
        onClose();
        
        // Notify parent component of successful initialization
        if (onPaymentSuccess) {
          onPaymentSuccess({
            reference: result.reference,
            status: 'initialized',
            message: 'Payment modal opened successfully'
          });
        }
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      setError(error.message || 'Failed to initialize payment. Please try again.');
      
      if (onPaymentError) {
        onPaymentError(error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="paystack-modal-overlay" onClick={handleClose}>
      <div className="paystack-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2>Complete Payment</h2>
          <button className="close-btn" onClick={handleClose} disabled={isProcessing}>
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {error && (
            <div className="error-message">
              <i className="bi bi-exclamation-triangle"></i>
              {error}
            </div>
          )}

          {/* Payment Summary */}
          <div className="payment-summary">
            <h3>Payment Summary</h3>
            
            <div className="summary-item">
              <span>Student ID:</span>
              <span>{userData?.studentId || 'N/A'}</span>
            </div>
            
            <div className="summary-item">
              <span>Student Name:</span>
              <span>{userData?.name || 'N/A'}</span>
            </div>
            
            <div className="summary-item">
              <span>Semester:</span>
              <span>{paymentData?.semester || 'N/A'}</span>
            </div>
            
            <div className="summary-item">
              <span>Fee Type:</span>
              <span>{paymentData?.feeType === 'tuition' ? 'Tuition Fee' : 'Other Fees'}</span>
            </div>
            
            {paymentData?.walletAmount > 0 && (
              <div className="summary-item">
                <span>Wallet Payment:</span>
                <span className="wallet-amount">
                  ₦{parseFloat(paymentData.walletAmount).toLocaleString()}.00
                </span>
              </div>
            )}
            
            {paymentData?.cardAmount > 0 && (
              <div className="summary-item">
                <span>Card Payment:</span>
                <span className="card-amount">
                  ₦{parseFloat(paymentData.cardAmount).toLocaleString()}.00
                </span>
              </div>
            )}
            
            <div className="summary-item">
              <span>Total Amount:</span>
              <span className="amount">
                ₦{parseFloat(paymentData?.totalDue || 0).toLocaleString()}.00
              </span>
            </div>
          </div>

          {/* Email Input */}
          <div className="payment-notice">
            <i className="bi bi-envelope"></i>
            <div>
              <p><strong>Payment Email:</strong></p>
              <p>Enter the email address where you'll receive payment confirmation and receipts.</p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="payment-email" style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#333'
            }}>
              Email Address:
            </label>
            <input
              type="email"
              id="payment-email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.2s'
              }}
              disabled={isProcessing}
            />
          </div>

          {/* Payment Notice */}
          <div className="payment-notice">
            <i className="bi bi-info-circle"></i>
            <div>
              <p><strong>Important:</strong></p>
              <p>You will be redirected to Paystack's secure payment gateway to complete your transaction. 
              All payments are processed securely and you'll receive a confirmation email upon successful payment.</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button 
            className="cancel-btn" 
            onClick={handleClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          
          <button 
            className="proceed-btn" 
            onClick={handleProceedToPayment}
            disabled={isProcessing || !email}
          >
            {isProcessing ? (
              <>
                <i className="bi bi-arrow-clockwise spin"></i>
                Processing...
              </>
            ) : (
              <>
                <i className="bi bi-credit-card"></i>
                Proceed to Payment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaystackPayment;
