// Paystack payment service for Baze University
// Using the official Paystack Inline JS library
import apiService from './apiService';
import localStorageService from './localStorageService';

// Your Paystack API Keys
const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'YOUR_PAYSTACK_PUBLIC_KEY';
const PAYSTACK_SECRET_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY || 'YOUR_PAYSTACK_SECRET_KEY';

class PaystackService {
  constructor() {
    this.publicKey = PAYSTACK_PUBLIC_KEY;
    this.secretKey = PAYSTACK_SECRET_KEY;
  }

  // Initialize Paystack payment
  async initializePayment(paymentData) {
    try {
      const {
        email,
        amount,
        reference,
        callback_url,
        metadata = {}
      } = paymentData;

      // Validate required fields
      if (!email || !amount || !reference) {
        throw new Error('Missing required payment fields');
      }

      // Convert amount to kobo (Paystack expects amount in kobo)
      const amountInKobo = Math.round(amount * 100);

      const paymentConfig = {
        key: this.publicKey,
        email: email,
        amount: amountInKobo,
        currency: 'NGN',
        ref: reference,
        callback: (response) => {
          console.log('Payment successful:', response);
          
          // Update payment status to success
          this.handleSuccessfulPayment(response.reference, response);
          
          // Redirect to success page or handle success
          if (callback_url) {
            window.location.href = callback_url;
          }
        },
        onClose: () => {
          console.log('Payment modal closed');
          // Handle payment modal close
        },
        metadata: {
          // Only include minimal, non-sensitive information
          reference: reference,
          amount: amount
        }
      };

      // Save payment record to local storage
      this.savePaymentRecord(paymentConfig, 'pending');

      // Initialize Paystack payment
      const handler = window.PaystackPop.setup(paymentConfig);
      handler.openIframe();

      return { success: true, reference };
    } catch (error) {
      console.error('Paystack initialization error:', error);
      throw error;
    }
  }

  // Verify payment on your backend
  async verifyPayment(reference) {
    try {
      // This should be called from your backend to verify the payment
      // For security reasons, the secret key should never be exposed in frontend code
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference })
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  // Generate unique reference
  generateReference() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `BAZE_${timestamp}_${random}`.toUpperCase();
  }

  // Save payment record to local storage
  savePaymentRecord(paymentData, status = 'pending') {
    try {
      // Create detailed payment description for local storage only
      const createDetailedDescription = () => {
        const items = [];
        
        if (paymentData.metadata?.tuition_items && paymentData.metadata.tuition_items.length > 0) {
          items.push('Tuition Fees');
        }
        
        if (paymentData.metadata?.other_items && paymentData.metadata.other_items.length > 0) {
          items.push('Other Fees');
        }
        
        items.push('Medicals');
        
        const studentInfo = paymentData.metadata?.student_name ? 
          ` for ${paymentData.metadata.student_name}` : '';
        
        return `Payment Portal Payment${studentInfo} - ${items.join(', ')}`;
      };

      const paymentRecord = {
        id: Date.now(),
        reference: paymentData.ref || paymentData.reference,
        amount: paymentData.amount,
        status: status,
        date: new Date().toISOString(),
        description: createDetailedDescription(),
        payment_method: paymentData.metadata?.payment_method || 'card',
        student_id: paymentData.metadata?.student_id,
        student_name: paymentData.metadata?.student_name,
        course: paymentData.metadata?.course,
        semester: paymentData.metadata?.semester,
        fee_type: paymentData.metadata?.fee_type,
        tuition_items: paymentData.metadata?.tuition_items,
        other_items: paymentData.metadata?.other_items,
        wallet_amount: paymentData.metadata?.wallet_amount,
        card_amount: paymentData.metadata?.card_amount,
        total_due: paymentData.metadata?.total_due,
        metadata: paymentData.metadata
      };

      return localStorageService.addPaymentRecord(paymentRecord);
    } catch (error) {
      console.error('Failed to save payment record:', error);
      return false;
    }
  }

  // Handle successful payment
  handleSuccessfulPayment(reference, response) {
    try {
      const paymentRecord = localStorageService.getPaymentRecordByReference(reference);
      if (paymentRecord) {
        paymentRecord.status = 'success';
        paymentRecord.date = new Date().toISOString();
        paymentRecord.payment_method = response.payment_method || 'card';
        localStorageService.updatePaymentRecord(paymentRecord);
        console.log(`Payment record updated to success: ${reference}`);
      } else {
        console.warn(`Payment record not found for reference: ${reference}`);
      }
    } catch (error) {
      console.error('Failed to update payment record status:', error);
    }
  }

  // Format amount for display
  formatAmount(amount) {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  }
}

export default new PaystackService();
