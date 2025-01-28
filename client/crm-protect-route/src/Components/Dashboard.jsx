import { useState, useEffect } from 'react';
import axios from '../axios';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('/api/customers', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setCustomers(response.data))
        .catch((error) => console.error('Error fetching customers:', error));
    }
  }, []);

  return (
    <div>
      <h2>Welcome to CRM Dashboard</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            <div>
              <h3>{customer.name}</h3>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Address:</strong> {customer.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;