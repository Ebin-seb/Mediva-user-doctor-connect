import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Modal } from 'react-bootstrap';

function Userdoctorview() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    symptoms: '',
    patientName: '',
    phone: '',
  });

  const showdoctor=async() => {
    const response= await axios.get('http://localhost:8000/api/user/viewdoctor')
    console.log(response.data.doctor)
    setDoctors(response.data.doctor);
  }
  useEffect(()=>{showdoctor()},[]);

 

  const handleBookAppointment = (doctor) => { 
    if(doctor.tokens <= 0){
      return alert('unable to book the doctor today')
    }
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setAppointmentForm(prev => ({
      ...prev,
      date: tomorrow.toISOString().split('T')[0]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAppointment = async(e) => {
    e.preventDefault();
    try{
      console.log('Appointment details:', {
        doctor: selectedDoctor,
        appointment: appointmentForm
      });
      const response = await axios.post('http://localhost:8000/api/user/docbooking',{
        ...appointmentForm,
        doctorid : selectedDoctor._id,
        userid: localStorage.getItem('userid'),
        status:'pending',
        fees :selectedDoctor._id
      })
      console.log(response)
      setShowAppointmentModal(false);
      setShowConfirmation(true);
      setAppointmentForm({
      date: '',
      symptoms: '',
      patientName: '',
      phone: '',
    });
      }
      catch(e){
        console.log(e)
      }
  };

  return ( 
    <Container fluid>
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 
                className="mb-1 fw-bold"
                style={{ 
                  background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Find & Book Doctors
              </h2>
              <p className="text-muted mb-0">Choose from our expert medical professionals</p>
            </div>
            <Badge 
              bg="light" 
              text="dark"
              style={{ 
                border: '1px solid rgba(0,0,0,0.1)',
                fontSize: '0.9rem'
              }}
            >
              {doctors.length} doctors available
            </Badge>
          </div>
        </Col>
      </Row>

      {/* Doctors Grid */}
      <Row className="g-3">
        {doctors.map(doctor => (
          <Col key={doctor.id} xl={6} xxl={4}>
            <Card 
              className="h-100 shadow-sm border-0"
              style={{
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              <Card.Body className="p-3">
                <Row className="g-3">
                  <Col xs={4} className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                  >
                    
                <img 
                src={`http://localhost:8000/${doctor.profilePic}`} 
                alt={doctor.doctorName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />                    
                  </Col>
                  <Col xs={8}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="fw-bold mb-1 text-dark">{doctor.doctorName}</h6>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-success">{doctor.fees}</div>
                        <small className="text-muted">per session</small>
                      </div>
                    </div>

                    <div className="mb-2">
                      <small className="text-muted d-block">
                        <span className="fw-semibold">Experience:</span> {doctor.experience}
                      </small>
                      <small className="text-muted d-block">
                        <span className="fw-semibold">Qualification:</span> {doctor.qualification}
                      </small>
                    </div>

                   

                    <div className="mb-2">
                      <small className="text-muted d-block">
                        <span className="fw-semibold">Available:</span> {doctor.availibleDays}
                      </small>
                      <small className="text-muted d-block">
                        <span className="fw-semibold">tokens availible:</span>{doctor.tokens === 0 ? 'no token left' : doctor.tokens} 
                      </small>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleBookAppointment(doctor)}
                      style={{
                        background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
                        border: 'none',
                        width: '100%',
                        fontWeight: '600'
                      }}
                    >
                      Book Appointment
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {doctors.length === 0 && (
        <Row className="mt-5">
          <Col className="text-center">
            <Card className="border-0 bg-light">
              <Card.Body className="py-5">
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>👨‍⚕️</span>
                </div>
                <h5 className="text-muted">No doctors found</h5>
                
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Appointment Modal */}
      <Modal 
        show={showAppointmentModal} 
        onHide={() => setShowAppointmentModal(false)}
        size="lg"
        centered
      >
        <Modal.Header 
          style={{
            background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
            color: 'white',
            border: 'none'
          }}
        >
          <Modal.Title className="fw-bold">
            Book Appointment with {selectedDoctor?.doctorName}
          </Modal.Title>
          <Button 
            variant="link" 
            onClick={() => setShowAppointmentModal(false)}
            className="p-1  ms-3 text-danger"
            style={{ fontSize: '1.5rem', textDecoration: 'none',
            }}
          >
             ×
          </Button>
        </Modal.Header>
        
        <Form onSubmit={handleSubmitAppointment}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Patient Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientName"
                    value={appointmentForm.patientName}
                    onChange={handleInputChange}
                    required
                    style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Group>
              </Col>
              

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Phone *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={appointmentForm.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Appointment Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={appointmentForm.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    disabled
                    style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Consultation Fee</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedDoctor?.fees || '' }
                    disabled
                    style={{
                      background: '#f8f9fa',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      color: '#198754'
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label className="fw-semibold">symptoms</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="symptoms"
                    value={appointmentForm.symptoms}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your symptoms or reason for appointment..."
                    style={{
                      border: '1px solid #dee2e6',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Group>
              </Col>

              {selectedDoctor && (
                <Col xs={12}>
                  <Card className="bg-light border-0">
                    <Card.Body>
                      <h6 className="fw-bold mb-3">Appointment Summary</h6>
                      <Row>
                        <Col md={4}>
                          <small className="text-muted d-block">Doctor</small>
                          <strong>{selectedDoctor.doctorName}</strong>
                        </Col>
                        <Col md={4}>
                          <small className="text-muted d-block">place</small>
                          <strong>{selectedDoctor.clinicAddress}</strong>
                        </Col>
                        <Col md={4}>
                          <small className="text-muted d-block">Fee</small>
                          <strong className="text-success">{selectedDoctor.fees}</strong>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Modal.Body>
          
          <Modal.Footer className="border-0">
            <Button 
              variant="outline-secondary"
              onClick={() => setShowAppointmentModal(false)}
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px'
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              Confirm Appointment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Confirmation Modal */}
      <Modal 
        show={showConfirmation} 
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <Modal.Body className="text-center p-4">
          <div 
            className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
              color: 'white',
              fontSize: '1.5rem'
            }}
          >
            ✓
          </div>
          
          <h5 className="fw-bold text-success mb-3">Appointment Confirmed!</h5>
          
          {selectedDoctor && (
            <Card className="border-0 bg-light mb-3">
              <Card.Body>
                <div className="mb-2">
                  <strong>Doctor:</strong> {selectedDoctor.doctorName}
                </div>
               
               
              </Card.Body>
            </Card>
          )}
          
          <p className="text-muted mb-3">
            You will receive a confirmation email with all the appointment details.
          </p>
          
          <Button
            onClick={() => setShowConfirmation(false)}
            style={{
              background: 'linear-gradient(135deg, #e11d48 0%, #1e40af 100%)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Userdoctorview;