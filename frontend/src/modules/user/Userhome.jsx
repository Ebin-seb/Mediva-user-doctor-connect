import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { Link, useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';

function Userhome() {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let logid = localStorage.getItem('userlogid')
  const fetchshop = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/userprofile/${logid}`);      
      setdata(response.data.user);
      localStorage.setItem('userid', response.data.user._id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login',{ replace: true }); 
  };

  useEffect(() => { 
    fetchshop(); 
  }, []);

  const sidebarTabs = [
    { key: 'dashboard', label: 'Dashboard', path: '' },
    { key: 'purchase', label: 'Purchase', path: 'userpurchase' },
    { key: 'orders', label: 'Orders', path: 'orders' },
    { key: 'doctors',label :'doctors', path:'doctors'},
    { key: 'appointments', label: 'appointments', path: 'appointments' },

  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  // Check if current tab is active
  const isTabActive = (tabPath) => {
    if (tabPath === '') {
      return location.pathname === `/userhome`;
    }
    return location.pathname.includes(tabPath);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Fixed Top Navbar */}
      <Navbar 
        style={{ 
          background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1030
        }}
        className="py-2"
      >
        <Container fluid>
          {/* Mediva Logo */}
          <Navbar.Brand className="me-4">
            <div className="d-flex align-items-center">
              <span 
                className="bg-dark text-white px-2 py-1 rounded-start fw-bold fs-3"
                style={{ letterSpacing: '1px' }}
              >
                Med</span>
              <span 
                className="bg-dark text-danger pe-2 py-1 rounded-end fw-bold fs-3"
                style={{ letterSpacing: '1px' }}
              >iva
              </span>
            </div>
          </Navbar.Brand>
          
          {/* Centered Search Bar */}
          <div className="d-flex justify-content-center flex-grow-1 mx-4">
            <InputGroup style={{ width: '400px' }}>
              <InputGroup.Text style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}>
                🔍
              </InputGroup.Text>
              <Form.Control
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white'
                }}
                type="text"
                placeholder="Search products, orders, customers..."
              />
            </InputGroup>
          </div>
          
          {/* User Profile and Logout Button */}
          <div className="ms-auto d-flex align-items-center gap-3">
            <div className="text-end text-white">
              <div className="fw-bold">{data.name}</div>
            </div>
            
            {/* Logout Button */}
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={handleLogout}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.5)',
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
              }}
            >
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Fixed Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: '56px',
          left: 0,
          bottom: 0,
          width: '280px',
          zIndex: 1020,
          background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          overflowY: 'auto'
        }}
      >
        <div 
          className="text-white fw-semibold fs-5 p-3 border-bottom border-white border-opacity-10"
        >
          User Dashboard
        </div>
        
        <Nav className="flex-column pt-3">
          {sidebarTabs.map((tab) => (
            <Nav.Link 
              key={tab.key}
              style={{
                color: isTabActive(tab.path) ? 'white' : 'rgba(255, 255, 255, 0.9)',
                background: isTabActive(tab.path) ? 'rgba(255, 255, 255, 0.2)' : 'none',
                padding: '12px 20px',
                margin: '6px 12px',
                borderRadius: '8px',
                fontWeight: '500',
                cursor: 'pointer',
                border: isTabActive(tab.path) ? '1px solid rgba(255, 255, 255, 0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isTabActive(tab.path)) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateX(4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isTabActive(tab.path)) {
                  e.target.style.background = 'none';
                  e.target.style.transform = 'translateX(0)';
                }
              }}
              onClick={() => handleTabClick(tab.path)}
            >
              {tab.label}
              {tab.badge && (
                <Badge 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white'
                  }} 
                  className="ms-2"
                >
                  {tab.badge}
                </Badge>
              )}
            </Nav.Link>
          ))}
        </Nav>
        
        <div className="mt-auto p-3 border-top border-white border-opacity-10">
          <Card 
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
            className="border-0"
          >
            <Card.Body className="text-white">
              <Card.Title>Need Help?</Card.Title>
              <Card.Text>
                Contact our support team
              </Card.Text>
              <Button variant="light" size="sm" className="mt-2">
                Get Help
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Main Content - This is where nested routes will render */}
      <div style={{ marginLeft: '280px', marginTop: '56px', padding: '25px', minHeight: 'calc(100vh - 56px)' }}>
        <Outlet context={{ userData: data }} />
      </div>
    </div>
  );
}

export default Userhome;