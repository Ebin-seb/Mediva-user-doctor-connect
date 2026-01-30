import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Alert, Form, Modal } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

function Productdetails() {
  const { productid } = useParams();
  const navigate = useNavigate();
  const { userData } = useOutletContext();
  const [product, setProduct] = useState(null); 
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderId, setOrderId] = useState(''); // New state for order ID
  
  // Simplified order data state
  const [orderData, setOrderData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  // Function to generate random order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${timestamp}-${randomNum}`;
  };

  // Fetch product details from API
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/user/productdetails/${productid}`);
      setProduct(response.data.product || response.data);
    } catch (err) {
      setError('Failed to fetch product details. Please try again later.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };
  // Handle order button click - show modal
  const handleOrderClick = () => {
    // Generate new order ID
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    
    // Pre-fill user data if available
    if (userData) {
      setOrderData(prev => ({
        ...prev,
        name: userData.fullName || userData.name || '',
        phone: userData.phone || ''
      }));
    }
    if(quantity>product.stock){
      alert("please ensure you have selected the quantity below the availible quantity ")
      return
    }
    setShowOrderModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Final order submission
  const handleFinalOrder = async () => {
    // Validate required fields
    if (!orderData.name || !orderData.address || !orderData.phone) {
      alert('Please fill in all required fields: Name, Address, and Phone.');
      return;
    }
    try {
      const finalOrderData = {
        orderId: orderId,
        address: orderData.address,
        totalPrice: product.price * quantity,
        quantity: quantity,
        phone: orderData.phone,
        userId: localStorage.getItem('userid'),
        productId: productid,
      };
      console.log(finalOrderData);
      
      const response = await axios.post('http://localhost:8000/api/user/userorder', finalOrderData);

        alert(response.data.message,`${orderId}`);
        navigate('/userhome/orders');
      
    } catch (err) {
      alert('Failed to place order. Please try again.');
      console.error('Error placing order:', err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productid]);

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border" style={{ color: '#e11d48' }}></div>
          <p className="mt-3 text-muted">Loading product details...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid>
        <Alert variant="danger" className="text-center">
          {error}
          <div className="mt-3">
            <Button 
              variant="outline-primary"
              onClick={() => navigate('/userhome/userpurchase')}
            >
              Back to Products
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container fluid>
        <Alert variant="warning" className="text-center">
          Product not found.
          <div className="mt-3">
            <Button 
              variant="outline-primary"
              onClick={() => navigate('/userhome/userpurchase')}
            >
              Back to Products
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      {/* Breadcrumb Navigation */}
      <Row className="mb-4">
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Button 
                  variant="link" 
                  className="p-0 text-decoration-none"
                  onClick={() => navigate('/userhome/userpurchase')}
                  style={{ color: '#e11d48' }}
                >
                  Products
                </Button>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </Col>
      </Row>

      <Row>
        {/* Product Images */}
        <Col lg={12} className="mb-4">
          <Card className="border-5 rounded-3 shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center">
                <img
                  src={`http://localhost:8000/${product.image}`}
                  alt={product.name}
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x400/667eea/ffffff?text=Product+Image';
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Product Details */}
        <Col lg={12}>
          <Card className="border-5 rounded-3 shadow-sm h-100">
            <Card.Body className="p-4">
              {/* Category and Status */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <Badge 
                  bg="light" 
                  text="dark"
                  className="px-3 py-2"
                  style={{ fontSize: '0.8rem', fontWeight: '500' }}
                >
                  {product.category}
                </Badge>
                <Badge 
                  bg={product.stock == 0 ? "danger" : "success"}
                  className="px-3 py-2"
                  style={{ fontSize: '0.8rem' }}
                >
                  {product.stock == 0 ? "Out of Stock" : "In Stock"}
                </Badge>
              </div>

              {/* Product Name */}
              <h1 className="h2 fw-bold mb-3" style={{ color: '#1e293b' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mb-3">
                <span className="text-warning h5">
                  {'★'.repeat(5)}
                </span>
                <span className="text-muted ms-2">(4.5/5)</span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <h2 className="fw-bold" style={{ color: '#e11d48' }}>
                  ${product.price}
                </h2>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div>
                    <span className="text-muted text-decoration-line-through h5">
                      ${product.originalPrice}
                    </span>
                    <Badge bg="danger" className="ms-2">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: '#1e293b' }}>Description</h5>
                <p className="text-muted" style={{ lineHeight: '1.6' }}>
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: '#1e293b' }}>Quantity</h5>
                <div className="d-flex align-items-center">
                  <Form.Select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    style={{ width: '100px' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </Form.Select>
                  <span className="ms-3 text-muted">
                    {product.stock } items available
                  </span>
                </div>
              </div>

              {/* Order Button */}
              <div className="d-grid gap-3">
                <Button
                  size="lg"
                  onClick={handleOrderClick}
                  style={{
                    background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
                    border: 'none',
                    fontWeight: '600',
                    padding: '15px',
                    fontSize: '1.1rem'
                  }}
                  className="rounded-3"
                >
                  🛒 Order Now - ${(product.price * quantity).toFixed(2)}
                </Button>

                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => navigate('/userhome/userpurchase')}
                  style={{
                    borderColor: '#e11d48',
                    color: '#e11d48',
                    fontWeight: '600',
                    padding: '12px'
                  }}
                  className="rounded-3"
                >
                  ← Back to Products
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order Modal */}
      <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Complete Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              {/* Order Summary */}
              <Card className="mb-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Order Summary</h6>
                    <Badge bg="primary" className="fs-6">
                      Order ID: {orderId}
                    </Badge>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={`http://localhost:8000/${product.image}`}
                      alt={product.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <div className="ms-3">
                      <h6 className="mb-1">{product.name}</h6>
                      <p className="text-muted mb-0">Quantity: {quantity}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>${(product.price * quantity).toFixed(2)}</strong>
                  </div>
                </Card.Body>
              </Card>

              {/* Shipping Information Form */}
              <h6 className="mb-3">Shipping Information</h6>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleFinalOrder}
            style={{
              background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
              border: 'none'
            }}
          >
            Confirm Order - ${(product.price * quantity).toFixed(2)}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Productdetails;