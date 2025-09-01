// Mock API Service for Baze University Payment System
// This can be replaced with real backend API calls later

class ApiService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  // Mock payment verification
  async verifyPayment(reference) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - in real implementation, this would call your backend
      const mockResponse = {
        success: true,
        data: {
          reference: reference,
          status: 'success',
          amount: 1000000, // Amount in kobo
          currency: 'NGN',
          gateway_response: 'Approved',
          paid_at: new Date().toISOString(),
          metadata: {
            student_id: 'BU/25A/IT/11894',
            student_name: 'Chidubem Michael Uwakwe',
            course: 'B.SC SOFTWARE ENGINEERING',
            semester: '25C',
            fee_type: 'tuition',
            payment_method: 'card'
          }
        },
        message: 'Payment verified successfully'
      };

      return mockResponse;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw new Error('Failed to verify payment');
    }
  }

  // Mock payment history
  async getPaymentHistory(studentId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockHistory = [
        {
          id: 1,
          reference: 'BAZE_1234567890_ABC123',
          amount: 2043916.00,
          status: 'success',
          date: '2025-01-15T10:30:00Z',
          description: 'Semester Tuition - 25C',
          payment_method: 'card'
        },
        {
          id: 2,
          reference: 'BAZE_1234567891_DEF456',
          amount: 1363397.12,
          status: 'success',
          date: '2025-01-10T14:20:00Z',
          description: 'Hostel Fee - 24A',
          payment_method: 'wallet'
        }
      ];

      return {
        success: true,
        data: mockHistory,
        message: 'Payment history retrieved successfully'
      };
    } catch (error) {
      console.error('Get payment history error:', error);
      throw new Error('Failed to retrieve payment history');
    }
  }

  // Mock wallet balance update
  async updateWalletBalance(studentId, amount, operation = 'deduct') {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockResponse = {
        success: true,
        data: {
          student_id: studentId,
          previous_balance: 650000,
          new_balance: operation === 'deduct' ? 650000 - amount : 650000 + amount,
          operation: operation,
          amount: amount,
          timestamp: new Date().toISOString()
        },
        message: `Wallet balance ${operation === 'deduct' ? 'deducted' : 'credited'} successfully`
      };

      return mockResponse;
    } catch (error) {
      console.error('Update wallet balance error:', error);
      throw new Error('Failed to update wallet balance');
    }
  }

  // Mock transaction log
  async logTransaction(transactionData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockResponse = {
        success: true,
        data: {
          transaction_id: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...transactionData,
          timestamp: new Date().toISOString(),
          status: 'logged'
        },
        message: 'Transaction logged successfully'
      };

      return mockResponse;
    } catch (error) {
      console.error('Log transaction error:', error);
      throw new Error('Failed to log transaction');
    }
  }
}

export default new ApiService();
