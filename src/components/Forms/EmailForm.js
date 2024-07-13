import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailForm = () => {

    const [vendorDetails, setVendorDetails] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmBulkEmail, setConfirmBulkEmail] = useState(false);
    const [agentName, setAgentName] = useState(false);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                setAgentName(localStorage.getItem("adminName"))
                const response = await axios.get(`http://localhost:9090/vendors/getAllVendors?adminName=${agentName}`);
                setVendors(response.data); 
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchVendors();
    }, []); 

    const handleSendBulkEmail = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:9090/email/sendBulk', vendorDetails);
            alert('Bulk emails sent successfully');
        } catch (error) {
            console.error('Error sending bulk emails:', error);
            alert('Failed to send bulk emails');
        } finally {
            setLoading(false);
            setConfirmBulkEmail(false); 
        }
    };

    const handleSendIndividualEmail = async (vendorId) => {
        setLoading(true);
        try {

            await axios.post('http://localhost:9090/email/send', { "vendorId": vendorId, "agentName": agentName });
            alert(`Email sent to Vendor ${vendorId}`);
        } catch (error) {
            console.error(`Error sending email to Vendor ${vendorId}:`, error);
            alert(`Failed to send email to Vendor ${vendorId}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (e, vendorId) => {
        if (e.target.checked) {
            setVendorDetails([...vendorDetails, { vendorId, agentName }]);
        } else {
            setVendorDetails(vendorDetails.filter(detail => detail.vendorId !== vendorId));
        }
    };


    const handleBulkEmailConfirmation = () => {
        setConfirmBulkEmail(true);
    };

    const handleCancelBulkEmail = () => {
        setConfirmBulkEmail(false);
    };

    return (
        <div>
            <h2>Select Vendors to Send Email</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>S. No.</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Vendor Name</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Send Email</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.map((vendor, index) => (
                        <tr key={vendor.id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <label>
                                    <input type="checkbox" onChange={(e) => handleCheckboxChange(e, vendor.id)} />
                                    {' '}
                                    {vendor.name}
                                </label>
                            </td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <button onClick={() => handleSendIndividualEmail(vendor.id)}>
                                    Send Email
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '1rem' }}>
                <button onClick={handleBulkEmailConfirmation} disabled={vendorDetails.length === 0 || loading}>
                    Send Bulk Email
                </button>

                {confirmBulkEmail && (
                    <div style={{ marginTop: '1rem' }}>
                        <p>Are you sure you want to send emails to selected vendors?</p>
                        <div>
                            <button onClick={handleSendBulkEmail} disabled={loading}>
                                Confirm
                            </button>
                            {' '}
                            <button onClick={handleCancelBulkEmail}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {loading && <p>Sending emails...</p>}
            </div>
        </div>
    );
};

export default EmailForm;
