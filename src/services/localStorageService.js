// Local Storage Service for Baze University Payment System
// Handles payment history storage with compression and fallback mechanisms

class LocalStorageService {
  constructor() {
    this.storageKey = 'baze_payment_history';
    this.maxStorageSize = 4.5 * 1024 * 1024; // 4.5MB (browser limit is usually 5MB)
    this.compressionThreshold = 100; // Compress when more than 100 records
  }

  // Check if local storage is available
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Get available storage space
  getAvailableStorage() {
    try {
      let total = 0;
      let used = 0;
      
      // Calculate used space
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length;
        }
      }
      
      // Estimate total available (browsers typically allow 5-10MB)
      total = this.maxStorageSize;
      
      return {
        total: total,
        used: used,
        available: total - used,
        percentage: (used / total) * 100
      };
    } catch (e) {
      return { total: 0, used: 0, available: 0, percentage: 0 };
    }
  }

  // Compress data using simple compression techniques
  compressData(data) {
    try {
      // Remove unnecessary whitespace and use shorter property names
      const compressed = data.map(payment => ({
        id: payment.id,
        ref: payment.reference, // shorter than 'reference'
        amt: payment.amount,    // shorter than 'amount'
        st: payment.status,     // shorter than 'status'
        dt: payment.date,       // shorter than 'date'
        desc: payment.description, // shorter than 'description'
        pm: payment.payment_method, // shorter than 'payment_method'
        meta: payment.metadata
      }));
      
      return JSON.stringify(compressed);
    } catch (e) {
      console.error('Compression failed:', e);
      return JSON.stringify(data);
    }
  }

  // Decompress data back to original format
  decompressData(compressedData) {
    try {
      const compressed = JSON.parse(compressedData);
      return compressed.map(payment => ({
        id: payment.id,
        reference: payment.ref,
        amount: payment.amt,
        status: payment.st,
        date: payment.dt,
        description: payment.desc,
        payment_method: payment.pm,
        metadata: payment.meta
      }));
    } catch (e) {
      console.error('Decompression failed:', e);
      return [];
    }
  }

  // Store payment history with compression
  storePaymentHistory(payments) {
    if (!this.isStorageAvailable()) {
      console.warn('Local storage not available');
      return false;
    }

    try {
      const storageInfo = this.getAvailableStorage();
      
      // Check if we have enough space
      if (storageInfo.available < 1000) { // Less than 1KB available
        this.cleanupOldRecords();
      }

      let dataToStore;
      let shouldCompress = payments.length > this.compressionThreshold;
      
      if (shouldCompress) {
        dataToStore = this.compressData(payments);
      } else {
        dataToStore = JSON.stringify(payments);
      }

      // Store with compression flag
      const storageData = {
        data: dataToStore,
        compressed: shouldCompress,
        timestamp: Date.now(),
        count: payments.length,
        version: '1.0'
      };

      localStorage.setItem(this.storageKey, JSON.stringify(storageData));
      
      // Store storage info for monitoring
      this.updateStorageStats();
      
      return true;
    } catch (e) {
      console.error('Failed to store payment history:', e);
      return false;
    }
  }

  // Retrieve payment history
  getPaymentHistory() {
    if (!this.isStorageAvailable()) {
      console.warn('Local storage not available');
      return [];
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];

      const storageData = JSON.parse(stored);
      
      if (storageData.compressed) {
        return this.decompressData(storageData.data);
      } else {
        return JSON.parse(storageData.data);
      }
    } catch (e) {
      console.error('Failed to retrieve payment history:', e);
      return [];
    }
  }

  // Add a single payment record
  addPaymentRecord(payment) {
    try {
      const existingHistory = this.getPaymentHistory();
      
      // Check if payment already exists (by reference)
      const existingIndex = existingHistory.findIndex(p => p.reference === payment.reference);
      
      if (existingIndex !== -1) {
        // Update existing record
        existingHistory[existingIndex] = { ...existingHistory[existingIndex], ...payment };
      } else {
        // Add new record
        existingHistory.unshift(payment); // Add to beginning
      }

      // Limit to last 1000 records to prevent storage overflow
      if (existingHistory.length > 1000) {
        existingHistory.splice(1000);
      }

      return this.storePaymentHistory(existingHistory);
    } catch (e) {
      console.error('Failed to add payment record:', e);
      return false;
    }
  }

  // Get payment record by reference
  getPaymentRecordByReference(reference) {
    try {
      const history = this.getPaymentHistory();
      return history.find(payment => payment.reference === reference);
    } catch (e) {
      console.error('Failed to get payment record by reference:', e);
      return null;
    }
  }

  // Update payment record
  updatePaymentRecord(updatedPayment) {
    try {
      const history = this.getPaymentHistory();
      const paymentIndex = history.findIndex(p => p.reference === updatedPayment.reference);
      
      if (paymentIndex !== -1) {
        history[paymentIndex] = { ...history[paymentIndex], ...updatedPayment };
        return this.storePaymentHistory(history);
      }
      
      return false;
    } catch (e) {
      console.error('Failed to update payment record:', e);
      return false;
    }
  }

  // Update payment status
  updatePaymentStatus(reference, newStatus) {
    try {
      const existingHistory = this.getPaymentHistory();
      const paymentIndex = existingHistory.findIndex(p => p.reference === reference);
      
      if (paymentIndex !== -1) {
        existingHistory[paymentIndex].status = newStatus;
        existingHistory[paymentIndex].lastUpdated = Date.now();
        return this.storePaymentHistory(existingHistory);
      }
      
      return false;
    } catch (e) {
      console.error('Failed to update payment status:', e);
      return false;
    }
  }

  // Search payments by various criteria
  searchPayments(criteria) {
    try {
      const history = this.getPaymentHistory();
      
      return history.filter(payment => {
        let matches = true;
        
        if (criteria.status && payment.status !== criteria.status) {
          matches = false;
        }
        
        if (criteria.semester && payment.metadata?.semester !== criteria.semester) {
          matches = false;
        }
        
        if (criteria.amount && payment.amount !== criteria.amount) {
          matches = false;
        }
        
        if (criteria.dateFrom && new Date(payment.date) < new Date(criteria.dateFrom)) {
          matches = false;
        }
        
        if (criteria.dateTo && new Date(payment.date) > new Date(criteria.dateTo)) {
          matches = false;
        }
        
        if (criteria.searchText) {
          const searchLower = criteria.searchText.toLowerCase();
          const matchesText = 
            payment.reference.toLowerCase().includes(searchLower) ||
            payment.description.toLowerCase().includes(searchLower) ||
            (payment.metadata?.student_name || '').toLowerCase().includes(searchLower);
          
          if (!matchesText) matches = false;
        }
        
        return matches;
      });
    } catch (e) {
      console.error('Search failed:', e);
      return [];
    }
  }

  // Clean up old records to free space
  cleanupOldRecords() {
    try {
      const history = this.getPaymentHistory();
      
      // Keep only last 500 records
      if (history.length > 500) {
        const cleanedHistory = history.slice(0, 500);
        this.storePaymentHistory(cleanedHistory);
        console.log('Cleaned up old payment records');
      }
    } catch (e) {
      console.error('Cleanup failed:', e);
    }
  }

  // Export payment history as JSON
  exportPaymentHistory() {
    try {
      const history = this.getPaymentHistory();
      const exportData = {
        exportDate: new Date().toISOString(),
        totalRecords: history.length,
        data: history
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `baze_payment_history_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
      return true;
    } catch (e) {
      console.error('Export failed:', e);
      return false;
    }
  }

  // Import payment history from JSON
  importPaymentHistory(jsonData) {
    try {
      const importData = JSON.parse(jsonData);
      const existingHistory = this.getPaymentHistory();
      
      // Merge imported data with existing data
      const mergedHistory = [...existingHistory];
      
      if (importData.data && Array.isArray(importData.data)) {
        importData.data.forEach(importedPayment => {
          const existingIndex = mergedHistory.findIndex(p => p.reference === importedPayment.reference);
          
          if (existingIndex !== -1) {
            // Update existing record
            mergedHistory[existingIndex] = { ...mergedHistory[existingIndex], ...importedPayment };
          } else {
            // Add new record
            mergedHistory.unshift(importedPayment);
          }
        });
      }
      
      return this.storePaymentHistory(mergedHistory);
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  // Clear all payment history
  clearPaymentHistory() {
    try {
      localStorage.removeItem(this.storageKey);
      this.updateStorageStats();
      return true;
    } catch (e) {
      console.error('Clear failed:', e);
      return false;
    }
  }

  // Update storage statistics
  updateStorageStats() {
    try {
      const stats = this.getAvailableStorage();
      localStorage.setItem('baze_storage_stats', JSON.stringify({
        lastUpdated: Date.now(),
        ...stats
      }));
    } catch (e) {
      console.error('Failed to update storage stats:', e);
    }
  }

  // Get storage statistics
  getStorageStats() {
    try {
      const stats = localStorage.getItem('baze_storage_stats');
      return stats ? JSON.parse(stats) : null;
    } catch (e) {
      console.error('Failed to get storage stats:', e);
      return null;
    }
  }

  // Backup payment history to multiple storage keys
  createBackup() {
    try {
      const history = this.getPaymentHistory();
      const backupKey = `${this.storageKey}_backup_${Date.now()}`;
      
      localStorage.setItem(backupKey, JSON.stringify({
        data: history,
        timestamp: Date.now(),
        count: history.length
      }));
      
      // Keep only last 3 backups
      this.cleanupOldBackups();
      
      return true;
    } catch (e) {
      console.error('Backup failed:', e);
      return false;
    }
  }

  // Clean up old backups
  cleanupOldBackups() {
    try {
      const backupKeys = Object.keys(localStorage).filter(key => 
        key.startsWith(`${this.storageKey}_backup_`)
      );
      
      if (backupKeys.length > 3) {
        // Sort by timestamp and remove oldest
        backupKeys.sort((a, b) => {
          const timestampA = parseInt(a.split('_').pop());
          const timestampB = parseInt(b.split('_').pop());
          return timestampA - timestampB;
        });
        
        // Remove oldest backups
        backupKeys.slice(0, backupKeys.length - 3).forEach(key => {
          localStorage.removeItem(key);
        });
      }
    } catch (e) {
      console.error('Backup cleanup failed:', e);
    }
  }
}

export default new LocalStorageService();
