import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeesForm() {
  const [employeeData, setEmployeeData] = useState({ name: '', designation: '', ctc: '', email: '',createdBy: '' });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`http://localhost:9090/employees/getAllEmployeesByAdmin?adminName=${localStorage.getItem("adminName")}`);
        setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        employeeData.createdBy=localStorage.getItem("adminName");
      await axios.post('http://localhost:9090/employees/create', employeeData);
      alert('Employee added successfully');
      setEmployeeData({ name: '', designation: '', ctc: '', email: '',createdBy: ''  });
      fetchEmployees(); // Refresh employees after adding a new one
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Failed to add employee');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add Employee</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={employeeData.name} onChange={handleChange} placeholder="Name" required />
          <input type="text" name="designation" value={employeeData.designation} onChange={handleChange} placeholder="Designation" required />
          <input type="text" name="ctc" value={employeeData.ctc} onChange={handleChange} placeholder="CTC" required />
          <input type="email" name="email" value={employeeData.email} onChange={handleChange} placeholder="Email" required />
          <button type="submit">Submit</button>
        </form>
      )}

      <div>
        <h2>Employees</h2>
        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Serial Number</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Designation</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>CTC</th>
                <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{employee.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{employee.designation}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{employee.ctc}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeesForm;
