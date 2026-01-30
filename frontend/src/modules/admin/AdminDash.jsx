import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Card, Row, Col, Button, Badge, Container } from 'react-bootstrap';

export function Admindashboard() {
  const { admindata } = useOutletContext();
console.log(admindata)
  // Mock user stats - replace with actual data from your API
  // const userStats = {
  //   stats: {
  //     orders: 12,
  //     pending: 3,
  //     completed: 9,
  //     wishlist: 8
  //   },
   
  // };

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
          <Col md={3}>
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <img 
                src={`http://localhost:8000/${doctordata.profilePic}`} 
                alt={doctordata.doctorName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
              </div>
            </div>
          </Col>
          <Col md={9}>
            <Card.Body className="d-flex flex-column h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <Card.Title className="h2 mb-1">{doctordata.doctorName} :  {doctordata.regno}</Card.Title>
                  <Card.Title className="h3 mb-1">{doctordata.clinicName}</Card.Title>
                  <Card.Text className="text-muted mb-2">{doctordata.clinicAddress}</Card.Text>
                  <Card.Text className="text-muted mb-2">{doctordata.availibleDays}</Card.Text>
                  <Card.Text className="text-muted mb-2">{doctordata.consultationTimeFrom} - {doctordata.consultationTimeTo}</Card.Text>


                </div>
                <Link to={`doctoredit`}>
                <Button 
                  variant="outline-primary"
                  style={{ 
                    borderColor: '#e11d48',
                    color: '#e11d48'
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
                  Edit profile
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