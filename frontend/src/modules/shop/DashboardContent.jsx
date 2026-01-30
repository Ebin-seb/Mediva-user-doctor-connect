// This should be in a separate file or at the bottom of Shophome.js
import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';

export function DashboardContent() {
  const { shopData } = useOutletContext();
  
  const shopStats = {
    stats: {
      products: 245,
      orders: 89,
      customers: 156,
      revenue: "$12,489"
    }
  };

  return (
    <>
      {/* Shop Header with Photo */}
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
                src={`http://localhost:8000/${shopData.image}`} 
                alt={shopData.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Col>
          <Col md={9}>
            <Card.Body className="d-flex flex-column h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <Card.Title className="h2 mb-1">{shopData.name}</Card.Title>
                  <Card.Text className="text-muted mb-2">{shopData.address}</Card.Text>
                  <div>⭐⭐⭐⭐⭐ (4.8/5.0)</div>
                </div>
                <Link to={`editshop`}>
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
                  Edit Shop
                </Button>
                </Link>
              </div>
              
              <div className="mt-auto">
                <Row>
                  <Col xs={3} className="text-center">
                    <div className="fs-4 fw-bold" style={{ color: '#1e40af' }}>{shopStats.stats.products}</div>
                    <div className="text-muted small">Products</div>
                  </Col>
                  <Col xs={3} className="text-center">
                    <div className="fs-4 fw-bold" style={{ color: '#1e40af' }}>{shopStats.stats.orders}</div>
                    <div className="text-muted small">Orders</div>
                  </Col>
                  <Col xs={3} className="text-center">
                    <div className="fs-4 fw-bold" style={{ color: '#1e40af' }}>{shopStats.stats.customers}</div>
                    <div className="text-muted small">Customers</div>
                  </Col>
                  <Col xs={3} className="text-center">
                    <div className="fs-4 fw-bold" style={{ color: '#1e40af' }}>{shopStats.stats.revenue}</div>
                    <div className="text-muted small">Revenue</div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Rest of your dashboard content... */}
      {/* Keep all the dashboard cards and recent activity from your original code */}
    </>
  );
}