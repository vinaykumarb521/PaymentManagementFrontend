// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import EmployeesForm from './components/Forms/EmployeesForm';
import VendorForm from './components/Forms/VendorForm';
import EmailForm from './components/Email/EmailForm';
import EmailLog from './components/Email/EmailLog';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { AuthProvider, useAuth } from './components/Auth/AuthProvider'; // Ensure correct path

const NavigationContainer = styled('nav')({
  display: 'flex',
  '& ul': {
    display: 'flex',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    '& li': {
      marginLeft: '1rem',
    },
    '& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },
});

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Payment Management System
            </Typography>
            <NavigationContainer>
              <ul>
                <li>
                  <Link to="/employees">Employees</Link>
                </li>
                <li>
                  <Link to="/vendors">Vendors</Link>
                </li>
                <li>
                  <Link to="/send-email">Send Email</Link>
                </li>
                <li>
                  <Link to="/email-logs">Email Logs</Link>
                </li>
                <AuthControl />
              </ul>
            </NavigationContainer>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/employees" element={<ProtectedRoute element={<EmployeesForm />} />} />
            <Route path="/vendors" element={<ProtectedRoute element={<VendorForm />} />} />
            <Route path="/send-email" element={<ProtectedRoute element={<EmailForm />} />} />
            <Route path="/email-logs" element={<ProtectedRoute element={<EmailLog />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/employees" />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

const AuthControl = () => {
  const { isAuthenticated, adminName, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <li>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Admin: {adminName}
          </Typography>
        </li>
        <li>
          <Link to="/" onClick={() => logout()}>
            Logout
          </Link>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  }
};

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default App;
