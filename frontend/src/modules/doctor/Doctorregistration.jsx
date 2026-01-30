import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Navbars from '../../components/Navbars';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

function Doctorregistration() {
    
    const [doctorName, setDoctorName] = useState("")
    const [regno, setRegno] = useState("")
    const [clinicName, setClinicName] = useState("")
    const [clinicAddress, setClinicAddress] = useState("")
    const [availibleDays, setAvailibleDays] = useState("")
    const [consultationTimeFrom, setConsultationTimeFrom] = useState("")
    const [consultationTimeTo, setConsultationTimeTo] = useState("")
    const [fees, setFees] = useState("")
    const [experience, setExperience] = useState("")
    const [qualification, setQualification] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [token, settoken] = useState('')
    const [password, setPassword] = useState("")
    const [profilePic, setProfilePic] = useState(null)
    const navigate = useNavigate()

    // Function to generate random registration number
    const generateRegNo = () => {
        const prefix = "DOC";
        const timestamp = Date.now().toString().slice(-6);
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}${timestamp}${randomNum}`;
    }

    // Auto-generate registration number when component mounts
    useEffect(() => {
        setRegno(generateRegNo());
    }, []);

    // Function to regenerate registration number
    const handleRegenerateRegNo = () => {
        setRegno(generateRegNo());
    }
    
    const addDoctor = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            data.append("doctorName", doctorName)
            data.append("regno", regno)
            data.append("clinicName", clinicName)
            data.append("clinicAddress", clinicAddress)
            data.append("availibleDays", availibleDays)
            data.append("consultationTimeFrom", consultationTimeFrom)
            data.append("consultationTimeTo", consultationTimeTo)
            data.append("fees", fees)
            data.append("experience", experience)
            data.append("qualification", qualification)
            data.append("email", email)
            data.append("phone", phone)
            data.append("password", password)
            data.append("image", profilePic)
            data.append('token', token)
            
            console.log(data)
            const response = await axios.post("http://localhost:8000/api/doctor/register",data,
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
                        maxWidth: '800px',
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
                                Doctor Registration
                            </h2>
                            <p className="text-muted">Create your doctor account to get started</p>
                        </div>

                        <Form noValidate onSubmit={addDoctor}>
                            <Row className="mb-3">
                                {/* Personal Information */}
                                <Form.Group as={Col} md="6" className="mb-3" controlId="doctorName">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Doctor Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter doctor name"
                                        onChange={(e) => setDoctorName(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3" controlId="regno">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Registration Number</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Registration number"
                                            value={regno}
                                            readOnly
                                            style={{
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                fontSize: '16px',
                                                backgroundColor: '#f8f9fa'
                                            }}
                                            className="focus-ring"
                                        />
                                        <Button 
                                            variant="outline-secondary"
                                            onClick={handleRegenerateRegNo}
                                            style={{
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '8px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            Regenerate
                                        </Button>
                                    </InputGroup>
                                    <Form.Text className="text-muted">
                                        Auto-generated registration number
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3" controlId="qualification">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Qualification</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter qualifications"
                                        onChange={(e) => setQualification(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3" controlId="experience">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Experience</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter years of experience"
                                        onChange={(e) => setExperience(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                {/* Clinic Information */}
                                <Form.Group as={Col} md="6" className="mb-3" controlId="clinicName">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Clinic Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter clinic name"
                                        onChange={(e) => setClinicName(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3" controlId="fees">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Consultation Fees</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder="Enter consultation fees"
                                        onChange={(e) => setFees(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="12" className="mb-3" controlId="clinicAddress">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Clinic Address</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter complete clinic address"
                                        onChange={(e) => setClinicAddress(e.target.value)}
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

                                {/* Availability */}
                                <Form.Group as={Col} md="6" className="mb-3" controlId="availibleDays">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Available Days</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="e.g., Mon-Fri, Monday to Saturday"
                                        onChange={(e) => setAvailibleDays(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="3" className="mb-3" controlId="consultationTimeFrom">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Time From</Form.Label>
                                    <Form.Control
                                        required
                                        type="time"
                                        onChange={(e) => setConsultationTimeFrom(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="3" className="mb-3" controlId="consultationTimeTo">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Time To</Form.Label>
                                    <Form.Control
                                        required
                                        type="time"
                                        onChange={(e) => setConsultationTimeTo(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                {/* Contact Information */}
                                <Form.Group as={Col} md="6" className="mb-3" controlId="email">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Email Address</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter email address"
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '16px'
                                        }}
                                        className="focus-ring"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3" controlId="phone">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Phone Number</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter phone number"
                                            required
                                            onChange={(e) => setPhone(e.target.value)}
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

                                <Form.Group as={Col} md="6" className="mb-3" controlId="password">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Password</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
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

                                <Form.Group as={Col} md="6" className="mb-3" controlId="token">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Max Tokens</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter maximum patient tokens"
                                            required
                                            onChange={(e) => settoken(e.target.value)}
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

                                <Form.Group as={Col} md="6" className="mb-4" controlId="profilePic">
                                    <Form.Label className="fw-semibold" style={{ color: '#1e40af' }}>Profile Picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        required
                                        name="file"
                                        onChange={(e) => setProfilePic(e.target.files[0])}
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
                                    Register Doctor
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

export default Doctorregistration