import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Breadcrumb, Alert, InputGroup } from 'react-bootstrap';
import axios from 'axios';
function ProductsAdd() {
  const {id, productid } = useParams();
  console.log(productid)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: null
  });

  const categories = [ 'Medicines', 'Healthcare'];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const currentproduct = async()=>{
    try{
      const response = await axios.get(`http://localhost:8000/api/shop/currentproduct/${productid}`)
      console.log(response.data)
      setFormData({
        name:response.data.prod.name,
    category:response.data.prod.category,
    price: response.data.prod.price,
    stock: response.data.prod.stock,
    description: response.data.prod.description,
      })
    }
    catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{currentproduct()},[])



  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Product data:', formData);
    try{
        const data = new FormData();
        data.append("name",formData.name)
        data.append("category",formData.category)
        data.append("price",formData.price)
        data.append("stock",formData.stock)
        data.append("description",formData.description)
        if (formData.image!=null){data.append("image",formData.image)}


    
        const response = await axios.put(`http://localhost:8000/api/shop/productedit/${productid}`, data,
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            alert(response.data.message);
            navigate(`/shophome/${id}/products`)
    }
    catch(e){
        console.log(e)
    }
  };


  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Products updation</h1>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/shophome/${id}` }}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/shophome/${id}/products` }}>
              Products
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit product</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Link to={`/shophome/${id}/products`} className="btn btn-outline-secondary">
          <i className="fas fa-arrow-left me-2"></i>
          Back to Products
        </Link>
      </div>

      <Row className="justify-content-center">
        <Col onSubmit={handleSubmit} lg={10}>
          <Card className="border-0 shadow">
            <Card.Body className="p-4">
              <Form>
                {/* Basic Information Section */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#1e40af', borderBottom: '2px solid #1e40af', paddingBottom: '8px' }}>
                    <i className="fas fa-info-circle me-2"></i>
                    Basic Information
                  </h5>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Product Name </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter product name"
                          className="focus-ring"
                          
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Category *</Form.Label>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="focus-ring"
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter detailed product description..."
                      className="focus-ring"
                    />
                  </Form.Group>

              
                </div>

                {/* Pricing Section */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#1e40af', borderBottom: '2px solid #1e40af', paddingBottom: '8px' }}>
                    <i className="fas fa-tag me-2"></i>
                    Pricing & Inventory
                  </h5>
                  
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Regular Price *</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            placeholder="0.00"
                            className="focus-ring"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Stock Quantity *</Form.Label>
                        <Form.Control
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          required
                          placeholder="0"
                          className="focus-ring"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                {/* Image Upload Section */}
                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: '#1e40af', borderBottom: '2px solid #1e40af', paddingBottom: '8px' }}>
                    <i className="fas fa-image me-2"></i>
                    Product Image
                  </h5>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Product Image *</Form.Label>
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={handleInputChange}
                          className="focus-ring"
                        />
                        <Form.Text className="text-muted">
                          Recommended size: 500x500px. Supported formats: JPG, PNG, GIF
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                </div>

                {/* Submit Buttons */}
                <div className="d-flex gap-2 justify-content-end border-top pt-4">
                  <Link to={`/shophome/${id}/products`} className="btn btn-secondary px-4">
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </Link>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="px-4"
                    style={{ 
                      background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
                      border: 'none'
                    }}
                  >
                  
                        <i className="fas fa-plus me-2"></i>
                        Add Product
                     
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Custom Styles */}
      <style>
        {`
          .focus-ring:focus {
            border-color: #e11d48 !important;
            box-shadow: 0 0 0 0.2rem rgba(225, 29, 72, 0.25) !important;
          }
          
          .btn:hover {
            transform: translateY(-1px);
            transition: all 0.3s ease;
          }
        `}
      </style>
    </Container>   
  );
}

export default ProductsAdd;