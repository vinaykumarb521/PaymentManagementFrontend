import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailLog = () => {
    const [emailLogs, setEmailLogs] = useState([]);

    useEffect(() => {
        fetchEmailLogs();
    }, []);

    const fetchEmailLogs = async () => {
        try {
            const response = await axios.get('http://localhost:9090/email/emailLogs/byCreatedBy', {
                params: {
                    createdBy: localStorage.getItem("adminName")
                }
            });
            setEmailLogs(response.data);
        } catch (error) {
            console.error('Error fetching email logs:', error);
            alert('Failed to fetch email logs');
        }
    };

    return (
        <div>
            <h2>Email Logs</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Vendor ID</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Email Content</th>
                        <th style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {emailLogs.map((log) => (
                        <tr key={log.id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{log.vendorId}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{log.emailContent}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmailLog;
