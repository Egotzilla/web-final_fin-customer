// Customer API functions for frontend use

const API_BASE_URL = '/api/customer';

export const customerActions = {
  // Get all customers
  async getAllCustomers() {
    try {
      const response = await fetch(API_BASE_URL);
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get single customer by ID
  async getCustomerById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create new customer
  async createCustomer(customerData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update customer
  async updateCustomer(id, customerData) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete customer
  async deleteCustomer(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete all customers (for testing)
  async deleteAllCustomers() {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'DELETE',
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default customerActions;