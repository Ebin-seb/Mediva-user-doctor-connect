import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Navbars from '../../components/Navbars';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function Shopreg() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [phone, setphone] = useState()
    const [password, setpassword] = useState("")
    const [image, setimage] = useState(null)
    const navigate = useNavigate()

    const addshop = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            data.append("name", name)
            data.append("email", email)
            data.append("address", address)
            data.append("phone", phone)
            data.append("password", password)
            data.append("image", image)
            console.log(data)
            const response = await axios.post("http://localhost:8000/api/shop/register", data,
                {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                })
            alert(response.data.message)
            navigate('/login')
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Navbars />

            <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" 
                style={{ 
                    background: 'linear-gradient(135deg, #fdf2f8 0%, #dbeafe 100%)',
                    padding: '20px'
                }}>
                <Card 
                    className="shadow-lg border-0 rounded-4" 
                    style={{ 
                        width: '100%', 
                        maxWidth: '600px',
                        background: 'white'
                    }}
                >
                    <Card.Body className="p-5">
                        {/* Header with Mediva Logo */}
                        <div className="text-center mb-4">
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <span 
                                    className="bg-dark text-white px-2 py-1 rounded-start fw-bold fs-2"
                                    style={{ letterSpacing: '1px' }}
                                >
                                    Med
                                </span>
                                <span 
                                    className="bg-dark text-danger px-2 py-1 rounded-end fw-bold fs-2"
                                    style={{ letterSpacing: '1px' }}
                                >
                                    iva
                                </span>
                            </div>
                            <h2 
                                className="fw-bold" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                Shop Registration
                            </h2>
                            <p className="text-muted">Create your shop account to get started</p>
                        </div>

                        <Form noValidate onSubmit={addshop}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom01">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Shop Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter shop name"
                                        onChange={(e) => setname(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustom02">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Email Address</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter email address"
                                        onChange={(e) => setemail(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="12" className="mb-3">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Shop Address</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={4}
                                        placeholder="Enter complete shop address"
                                        onChange={(e) => setaddress(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px',
                                            resize: 'none'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustomUsername">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Phone Number</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter phone number"
                                            required
                                            onChange={(e) => setphone(e.target.value)}
                                            style={{
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                fontSize: '16px'
                                            }}
                                            className="focus-ring"
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group as={Col} md="12" className="mb-3" controlId="validationCustomUsername">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Password</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            required
                                            onChange={(e) => setpassword(e.target.value)}
                                            style={{
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                fontSize: '16px'
                                            }}
                                            className="focus-ring"
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Shop Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        required
                                        name="file"
                                        onChange={(e) => setimage(e.target.files[0])}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>
                            </Row>

                            <div className="d-grid">
                                <Button 
                                    type="submit" 
                                    size="lg"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="btn-hover"
                                >
                                    Register Shop
                                </Button>
                            </div>

                            <div className="text-center mt-3">
                                <p className="text-muted">
                                    Already have an account?{' '}
                                    <a 
                                        href="/login" 
                                        style={{ 
                                            color: '#e11d48',
                                            textDecoration: 'none',
                                            fontWeight: '600'
                                        }}
                                        onMouseOver={(e) => e.target.style.color = '#1e40af'}
                                        onMouseOut={(e) => e.target.style.color = '#e11d48'}
                                    >
                                        Login here
                                    </a>
                                </p>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            {/* Custom Styles */}
            <style>
                {`
                    .focus-ring:focus {
                        border-color: #e11d48 !important;
                        box-shadow: 0 0 0 0.2rem rgba(225, 29, 72, 0.25) !important;
                    }
                    
                    .btn-hover:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(225, 29, 72, 0.3);
                    }
                    
                    .form-control {
                        transition: all 0.3s ease;
                    }
                    
                    .form-control:hover {
                        border-color: #cbd5e0;
                    }
                `}
            </style>
        </>
    )
}

export default Shopreg