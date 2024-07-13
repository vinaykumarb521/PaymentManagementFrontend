import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorForm = () => {
  const [vendorData, setVendorData] = useState({ name: '', upi: '', email: '',createdBy: ''  });
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
try {
  const response = await axios.get(`http://localhost:9090/vendors/getAllVendors?adminName=${localStorage.getItem("adminName")}`);
  console.log(response.data); // Assuming response.data contains the vendors data
} catch (error) {
  console.error('Error fetching vendors:', error);
}



      const response = await axios.get('http://localhost:9090/vendors/getAllVendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      alert('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        vendorData.createdBy=localStorage.getItem("adminName");
      await axios.post('http://localhost:9090/vendors/create', vendorData);
      alert('Vendor added successfully');
      setVendorData({ name: '', upi: '', email: '',vendorData:'' });
      fetchVendors(); // Refresh vendors after adding a new one
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding vendor:', error);
      alert('Failed to add vendor');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add Vendor</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={vendorData.name} onChange={handleChange} placeholder="Name" />
          <input type="text" name="upi" value={vendorData.upi} onChange={handleChange} placeholder="UPI" />
          <input type="email" name="email" value={vendorData.email} onChange={handleChange} placeholder="Email" />
          <button type="submit">Submit</button>
        </form>
      )}

      <div>
        <h2>Vendor History</h2>
        {loading ? (
          <p>Loading vendors...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>UPI</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{vendor.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{vendor.upi}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{vendor.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VendorForm;
