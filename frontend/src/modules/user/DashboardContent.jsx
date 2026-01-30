import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Card, Row, Col, Button, Badge, Container } from 'react-bootstrap';

export function UserDashboard() {
  const { userData } = useOutletContext();

  // Mock user stats - replace with actual data from your API
  const userStats = {
    stats: {
      orders: 12,
      pending: 3,
      completed: 9,
      wishlist: 8
    },
   
  };

  return (
    <Container fluid>
      {/* User Profile Card */}
      <Card 
        className="mb-4 border-0 rounded-3 shadow" 
        style={{ 
          background: 'linear-gradient(135deg, #fdf2f8 0%, #dbeafe 100%)'
        }}
      >
        <Row className="g-0">
         
          <Col md={9}>
            <Card.Body className="d-flex flex-column h-100 p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <Card.Title className="h2 mb-1" style={{ color: '#1e293b' }}>{userData.name}</Card.Title>
                  <Card.Text className="text-muted mb-2">{userData.email}</Card.Text>
                  <Card.Text className="text-muted">{userData.phone}</Card.Text>
                </div>
                <Link to="edituser">
                  <Button 
                    variant="outline-primary"
                    style={{ 
                      borderColor: '#e11d48',
                      color: '#e11d48',
                      fontWeight: '600'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#e11d48';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#e11d48';
                    }}
                  >
                    Edit Profile
                  </Button>
                </Link>
              </div>
              
            </Card.Body>
          </Col>
        </Row>
      </Card>

      

      
    </Container>
  );
}