import React, { useState, useEffect } from 'react';
import './PaymentHistory.css';
import localStorageService from '../services/localStorageService';

const PaymentHistory = ({ onBack, userData }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    try {
      setLoading(true);
      
      // Load actual payment history from localStorage
      const storedPayments = localStorageService.getPaymentHistory();
      
      // If no stored payments, create some sample data for demonstration
      if (storedPayments.length === 0) {
        const samplePayments = [
          {
            id: 1,
            reference: 'BAZE_20250202_001',
            amount: 2043916.00,
            status: 'success',
            date: '2025-02-02T10:00:00Z',
            description: 'Payment Portal Payment for Chidubem Michael Uwakwe - Tuition Fees, Medicals',
            payment_method: 'card',
            metadata: {
              student_id: userData?.studentId || 'BU/25A/IT/11894',
              student_name: userData?.name || 'Chidubem Michael Uwakwe',
              semester: '25A',
              fee_type: 'tuition',
              payment_date: 'February 2nd, 2025',
              tuition_items: [1],
              other_items: [],
              wallet_amount: 0,
              card_amount: 2043916.00,
              total_due: 2083916.00
            }
          },
          {
            id: 2,
            reference: 'BAZE_20250204_002',
            amount: 1000000.00,
            status: 'success',
            date: '2025-02-04T14:30:00Z',
            description: 'Payment Portal Payment for Chidubem Michael Uwakwe - Other Fees, Medicals',
            payment_method: 'card',
            metadata: {
              student_id: userData?.studentId || 'BU/25A/IT/11894',
              student_name: userData?.name || 'Chidubem Michael Uwakwe',
              semester: '25A',
              fee_type: 'other',
              payment_date: 'February 4th, 2025',
              tuition_items: [],
              other_items: [1],
              wallet_amount: 0,
              card_amount: 1000000.00,
              total_due: 1040000.00
            }
          },
          {
            id: 3,
            reference: 'BAZE_20250512_003',
            amount: 2663642.07,
            status: 'success',
            date: '2025-05-12T04:33:00Z',
            description: 'Payment Portal Payment for Chidubem Michael Uwakwe - Tuition Fees, Other Fees, Medicals',
            payment_method: 'both',
            metadata: {
              student_id: userData?.studentId || 'BU/25A/IT/11894',
              student_name: userData?.name || 'Chidubem Michael Uwakwe',
              semester: '25A',
              fee_type: 'combined',
              payment_date: 'May 12th, 2025 at 04:33',
              tuition_items: [1],
              other_items: [1],
              wallet_amount: 500000.00,
              card_amount: 2163642.07,
              total_due: 2663642.07
            }
          }
        ];
        
        // Store the sample data
        localStorageService.storePaymentHistory(samplePayments);
        setPaymentHistory(samplePayments);
      } else {
        // Use the actual stored payments
        setPaymentHistory(storedPayments);
      }
      
    } catch (error) {
      setError('Error loading payment history');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { class: 'status-success', text: '✓ Success' },
      pending: { class: 'status-pending', text: '⏳ Pending' },
      failed: { class: 'status-failed', text: '✗ Failed' },
      processing: { class: 'status-processing', text: '🔄 Processing' }
    };

    const config = statusConfig[status] || { class: 'status-unknown', text: 'Unknown' };
    
    return (
      <span className={`status-badge ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const filteredHistory = paymentHistory.filter(payment => {
    const statusMatch = filterStatus === 'all' || payment.status === filterStatus;
    const semesterMatch = filterSemester === 'all' || 
      (payment.metadata && payment.metadata.semester === filterSemester);
    return statusMatch && semesterMatch;
  });

  const getUniqueSemesters = () => {
    const semesters = paymentHistory
      .map(payment => payment.metadata?.semester)
      .filter(semester => semester)
      .filter((semester, index, arr) => arr.indexOf(semester) === index);
    return semesters;
  };

  const calculateTotalPaid = () => {
    return filteredHistory
      .filter(payment => payment.status === 'success')
      .reduce((total, payment) => total + payment.amount, 0);
  };

  if (loading) {
    return (
      <div className="payment-history-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading payment history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-history-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Payment History</h3>
          <p>{error}</p>
          <button onClick={loadPaymentHistory} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-history-container">
      {/* Header */}
      <header className="history-header">
        <button onClick={onBack} className="back-btn">
          <i className="bi bi-arrow-left"></i>
          Back to Dashboard
        </button>
        <h1 className="history-title">Payment History</h1>
      </header>

      {/* Student Information */}
      <div className="student-info-section">
        <div className="student-card">
          <div className="student-avatar">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="student-details">
            <h3 className="student-name">{userData?.name || 'Student Name'}</h3>
            <p className="student-id">{userData?.studentId || 'Student ID'}</p>
            <p className="student-course">{userData?.course || 'Course'}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="processing">Processing</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="semester-filter">Semester:</label>
          <select
            id="semester-filter"
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Semesters</option>
            {getUniqueSemesters().map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        <div className="filter-summary">
          <span className="total-amount">
            Total Paid: {formatAmount(calculateTotalPaid())}
          </span>
          <span className="total-transactions">
            Transactions: {filteredHistory.length}
          </span>
          <span className="storage-info">
            Storage: {Math.round(localStorageService.getAvailableStorage().percentage)}% used
          </span>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="history-table-section">
        {filteredHistory.length === 0 ? (
          <div className="no-payments">
            <div className="no-payments-icon">📋</div>
            <h3>No Payment Records Found</h3>
            <p>No payments match your current filters.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="payment-history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((payment) => (
                  <tr key={payment.id} className="payment-row">
                    <td className="payment-date">
                      {formatDate(payment.date)}
                    </td>
                    <td className="payment-reference">
                      {payment.reference}
                    </td>
                    <td className="payment-description">
                      {payment.description}
                    </td>
                    <td className="payment-amount">
                      {formatAmount(payment.amount)}
                    </td>
                    <td className="payment-status">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="payment-method">
                      {payment.payment_method || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Print Summary */}
      <div className="print-summary">
        <div className="summary-card">
          <h3>Payment Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total Transactions:</span>
              <span className="summary-value">{filteredHistory.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Successful Payments:</span>
              <span className="summary-value">
                {filteredHistory.filter(p => p.status === 'success').length}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Amount Paid:</span>
              <span className="summary-value amount">
                {formatAmount(calculateTotalPaid())}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Generated On:</span>
              <span className="summary-value">
                {new Date().toLocaleDateString('en-NG')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Management */}
      <div className="storage-management">
        <div className="storage-card">
          <h3>Local Storage Management</h3>
          <div className="storage-actions">
            <button 
              onClick={() => localStorageService.createBackup()} 
              className="storage-btn backup-btn"
            >
              <i className="bi bi-cloud-upload"></i>
              Create Backup
            </button>
            <button 
              onClick={() => localStorageService.clearPaymentHistory()} 
              className="storage-btn clear-btn"
            >
              <i className="bi bi-trash"></i>
              Clear All
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="storage-btn refresh-btn"
            >
              <i className="bi bi-arrow-clockwise"></i>
              Refresh
            </button>
          </div>
          <div className="storage-stats">
            <div className="stat-item">
              <span className="stat-label">Storage Used:</span>
              <span className="stat-value">
                {Math.round(localStorageService.getAvailableStorage().percentage)}%
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Available Space:</span>
              <span className="stat-value">
                {Math.round(localStorageService.getAvailableStorage().available / 1024)} KB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
