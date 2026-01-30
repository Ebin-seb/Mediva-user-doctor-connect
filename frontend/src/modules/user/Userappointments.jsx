import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

function Userappointments() {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('all');
    const userid = localStorage.getItem('userid')

    // Fetch doctor's appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/appointments/${userid}`)
                setBookings(response.data.appo);
                console.log(response.data.appo)
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

      
            fetchAppointments();
      
    }, [userid]);

    // Filter appointments based on status
    const filteredAppointments = bookings.filter(booking => {
        if (filter === 'all') return true;
        return booking.status === filter;
    });

    // Update appointment status
    const updateAppointmentStatus = async (appointmentId, newStatus) => {
        try {
            await axios.patch(`http://localhost:8000/api/user/status/${appointmentId}`, {
                status: newStatus
            });
            
            // Update local state
            setBookings(prev => prev.map(booking => 
                booking._id === appointmentId 
                    ? { ...booking, status: newStatus }
                    : booking
            ));
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    // Get badge variant based on status
    const getStatusVariant = (status) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'danger';
            case 'completed': return 'primary';
            default: return 'secondary';
        }
    };

    // Handle radio button change
    const handleStatusChange = (appointmentId, newStatus) => {
        updateAppointmentStatus(appointmentId, newStatus);
    };

    return (
        <Container fluid>
            {/* Header */}
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="fw-bold mb-1">Appointments Management</h2>
                            <p className="text-muted mb-0">Manage and track patient appointments</p>
                        </div>
                        <div className="d-flex gap-2">
                            <Form.Select 
                                style={{ width: '200px' }}
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Appointments</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </Form.Select>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Appointments Table */}
            <Row>
                <Col>
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            {filteredAppointments.length === 0 ? (
                                <div className="text-center py-5">
                                    <h5 className="text-muted">No appointments found</h5>
                                    <p className="text-muted">There are no appointments matching your current filter.</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <Table hover className="mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>Patient</th>
                                                <th>Contact Info</th>
                                                <th>Symptoms</th>
                                                <th>Appointment Date & Time</th>
                                                <th>Current Status</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredAppointments.map((appointment) => (
                                                <tr key={appointment._id}>
                                                    <td>
                                                        <div>
                                                            <strong>{appointment.patientName}</strong>
                                                           
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <small className="text-muted">{appointment.phone}</small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <small>{appointment.symptoms}</small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <small>
                                                            {appointment.date}
]                                                        </small>
                                                    </td>
                                                    <td>
                                                        <Badge bg={getStatusVariant(appointment.status)}>
                                                            {appointment.status.toUpperCase()}
                                                        </Badge>
                                                    </td>
                                                    
                                                    <td>
                                                        <div className="d-flex gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="outline-danger"
                                                                onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                                                                disabled={appointment.status === 'completed' || appointment.status == 'cancelled'}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Userappointments;