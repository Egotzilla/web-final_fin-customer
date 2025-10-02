'use client';

import { useState, useEffect } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CustomerDetail() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    memberNumber: '',
    interests: ''
  });

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/customer`);
      const result = await response.json();
      
      if (result.success) {
        setCustomers(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setCustomers(prev => [result.data, ...prev]);
        setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
        setShowAddForm(false);
        setError('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to add customer');
    }
  };

  // Update customer
  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/customer/${editingCustomer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setCustomers(prev => 
          prev.map(customer => 
            customer._id === editingCustomer._id ? result.data : customer
          )
        );
        setEditingCustomer(null);
        setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
        setError('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to update customer');
    }
  };

  // Delete customer
  const handleDeleteCustomer = async (customerId) => {
    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/customer/${customerId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setCustomers(prev => prev.filter(customer => customer._id !== customerId));
        setError('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  // Start editing a customer
  const startEditing = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      dateOfBirth: new Date(customer.dateOfBirth).toISOString().split('T')[0],
      memberNumber: customer.memberNumber.toString(),
      interests: customer.interests
    });
    setShowAddForm(false);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingCustomer(null);
    setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
    setError('');
  };

  // Start adding new customer
  const startAdding = () => {
    setShowAddForm(true);
    setEditingCustomer(null);
    setFormData({ name: '', dateOfBirth: '', memberNumber: '', interests: '' });
    setError('');
  };

  if (loading) {
    return <div className="p-8 text-center">Loading customers...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Customer Management</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Customer Button */}
      <div className="mb-6">
        <button
          onClick={startAdding}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={showAddForm || editingCustomer}
        >
          Add New Customer
        </button>
      </div>

      {/* Add/Edit Customer Form */}
      {(showAddForm || editingCustomer) && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <form onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Number
                </label>
                <input
                  type="number"
                  name="memberNumber"
                  value={formData.memberNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests
                </label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {editingCustomer ? 'Update Customer' : 'Add Customer'}
              </button>
              <button
                type="button"
                onClick={editingCustomer ? cancelEditing : () => setShowAddForm(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Customers List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <h2 className="text-xl font-semibold p-4 border-b">All Customers ({customers.length})</h2>
        
        {customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No customers found. Add your first customer to get started.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <li key={customer._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {customer.name}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(customer)}
                          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                          disabled={editingCustomer || showAddForm}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Member #:</span> {customer.memberNumber}
                      </div>
                      <div>
                        <span className="font-medium">Date of Birth:</span> {' '}
                        {new Date(customer.dateOfBirth).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Interests:</span> {customer.interests}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Created: {new Date(customer.createdAt).toLocaleString()}
                      {customer.updatedAt !== customer.createdAt && (
                        <span> | Updated: {new Date(customer.updatedAt).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
