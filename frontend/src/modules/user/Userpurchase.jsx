import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Badge } from 'react-bootstrap';
import { Link, Outlet, useOutletContext } from 'react-router-dom';
import axios from 'axios';

function Userpurchase() {
  const { userData } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/products');
      console.log(response.data.products)
      setProducts(response.data.products || response.data);
      setFilteredProducts(response.data.products || response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set((response.data.products || response.data).map(product => product.category))];
      setCategories(['all', ...uniqueCategories]);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Filter products
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container fluid>
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-2" style={{ color: '#1e293b' }}>All Products</h2>
              <p className="text-muted mb-0">Discover amazing products just for you</p>
            </div>
            <Badge bg="primary" className="fs-6 px-3 py-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
            </Badge>
          </div>
        </Col>
      </Row>

      {/* Search and Filter Section */}
      <Card className="mb-4 border-0 rounded-3 shadow-sm">
        <Card.Body className="p-4">
          <Row className="g-3">
            <Col md={8}>
              <InputGroup>
                <InputGroup.Text style={{ background: '#f8f9fa', borderColor: '#dee2e6' }}>
                  🔍
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search products by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderColor: '#dee2e6',
                    borderRadius: '8px'
                  }}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  borderColor: '#dee2e6',
                  borderRadius: '8px'
                }}
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="border-0 rounded-3 shadow-sm text-center py-5">
          <Card.Body>
            <div style={{ fontSize: '4rem', color: '#e9ecef' }}>📦</div>
            <h4 className="mt-3 text-muted">No products found</h4>
            <p className="text-muted">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No products are currently available.'
              }
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {filteredProducts.map(product => (
            <Col key={product._id} xl={3} lg={4} md={6} className="mb-4">
                <Link to={`/userhome/productdetails/${product._id}`}>
              <Card 
                className="h-100 border-0 rounded-3 shadow-sm product-card"
                style={{ 
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}
              >
                {/* Product Image */}
                <div 
                  style={{ 
                    height: '200px', 
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                  className="rounded-top-3"
                >
                  <img
                    src={`http://localhost:8000/${product.image}`}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200/667eea/ffffff?text=Product+Image';
                    }}
                  />
                  <Badge 
                    bg={product.stock>0? "success" : "danger" }
                    className="position-absolute top-0 end-0 m-2"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {product.stock>0?"in stock":"out of stock"}
                  </Badge>
                </div>

                <Card.Body className="d-flex flex-column">
                  {/* Product Category */}
                  <div className="mb-2">
                    <Badge 
                      bg="light" 
                      text="dark"
                      style={{ 
                        fontSize: '0.7rem',
                        fontWeight: '500'
                      }}
                    >
                      {product.category}
                    </Badge>
                  </div>

                  {/* Product Name */}
                  <Card.Title 
                    className="h6 mb-2"
                    style={{ 
                      color: '#1e293b',
                      lineHeight: '1.4',
                      minHeight: '2.8rem'
                    }}
                  >
                    {product.name}
                  </Card.Title>

                  {/* Product Description */}
                  <Card.Text 
                    className="text-muted small mb-3 flex-grow-1"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {product.description}
                  </Card.Text>

                  {/* Price */}
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span 
                          className="h5 fw-bold mb-0"
                          style={{ color: '#e11d48' }}
                        >
                          ${product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span 
                            className="text-muted text-decoration-line-through small ms-2"
                          >
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-warning small">
                        {'★'.repeat(5)}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Userpurchase;