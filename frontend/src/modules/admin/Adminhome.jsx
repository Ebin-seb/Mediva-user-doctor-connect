import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
  Container, Row, Col, Navbar, Card, Button, 
  Table, Badge, Tabs, Tab, Form, InputGroup, 
  Spinner, Alert, Modal
} from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

function Adminhome() {
  const [adminData, setAdminData] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState('');
  const navigate = useNavigate();
  let logid = localStorage.getItem('adminlogid');

  // Dummy data for demonstration
  const [users, setUsers] = useState([
  ]);

  const [doctors, setDoctors] = useState([
  ]);

  const [shops, setShops] = useState([
  ]);

const fetchuser = async()=>{
  try{
    const response=await axios.get('http://localhost:8000/api/admin/user')
    console.log(response)
    setUsers(response.data.exist)
  }
  catch(e){
    console.log(e)
  }
}
useEffect(()=>{fetchuser()},[])

const fetchdoctor = async()=>{
  try{
    const response=await axios.get('http://localhost:8000/api/admin/doctor')
    console.log(response)
    setDoctors(response.data.exist)
  }
  catch(e){
    console.log(e)
  }
}
useEffect(()=>{fetchdoctor()},[])
const fetchshop = async()=>{
  try{
    const response=await axios.get('http://localhost:8000/api/admin/shop')
    console.log(response)
    setShops(response.data.exist)
  }
  catch(e){
    console.log(e)
  }
}
useEffect(()=>{fetchshop()},[])

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalShops: 0,
    pendingDoctors: 0,
    pendingShops: 0,
  });

  useEffect(() => {
    // Calculate statistics from data
    setStats({
      totalUsers: users.length,
      totalDoctors: doctors.length,
      totalShops: shops.length,
      pendingDoctors: doctors.filter(d => d.status === 'pending').length,
      pendingShops: shops.filter(s => s.status === 'pending').length,
    });
  }, [users, doctors, shops]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true }); 
  };

  const handleViewDetails = (item, type) => {
    setSelectedItem(item);
    setSelectedItemType(type);
    setShowModal(true);
  };

  const handleVerifyDoctor = (doctorId) => {
    setDoctors(doctors.map(doc => 
      doc.id === doctorId ? { ...doc, status: 'verified' } : doc
    ));
  };

  const handleVerifyShop = (shopId) => {
    setShops(shops.map(shop => 
      shop.id === shopId ? { ...shop, status: 'verified' } : shop
    ));
  };

  const handleDeleteUser = async(userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try{
        const res= await axios.delete(`http://localhost:8000/api/admin/deleteuser/${userId}`)
        fetchuser()
      }
      catch(e){
        console.log(e)
      }
    }
  };

  const handleDeleteDoctor = async(id) => {
    if (window.confirm('Are you sure you want to delete this ')) {
      try{
        const res= await axios.delete(`http://localhost:8000/api/admin/deletedoctor/${id}`)
        fetchdoctor()
      }
      catch(e){
        console.log(e)
      }
    }
  };

  const handleDeleteShop = async(id) => {
    if (window.confirm('Are you sure you want to delete this ')) {
      try{
        const res= await axios.delete(`http://localhost:8000/api/admin/deleteshop/${id}`)
        fetchshop()
      }
      catch(e){
        console.log(e)
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDoctors = doctors.filter(doctor =>
    doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.qualfication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.experience.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const StatCard = ({ title, value, iconText, color, subtext, onClick }) => (
    <Card 
      className="h-100 shadow-sm border-0" 
      style={{ 
        cursor: onClick ? 'pointer' : 'default',
        borderLeft: `4px solid ${color}`,
        transition: 'transform 0.2s'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        if (onClick) e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <Card.Body className="d-flex align-items-center p-3">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center me-3"
          style={{ 
            width: '50px', 
            height: '50px', 
            backgroundColor: `${color}20`,
            color: color,
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}
        >
          {iconText}
        </div>
        <div>
          <h3 className="mb-0">{value}</h3>
          <p className="text-muted mb-0">{title}</p>
          {subtext && <small className="text-muted">{subtext}</small>}
        </div>
      </Card.Body>
    </Card>
  );

  const ActionButton = ({ variant, children, onClick, disabled }) => (
    <Button 
      variant={variant} 
      size="sm" 
      onClick={onClick} 
      disabled={disabled}
      style={{ minWidth: '80px' }}
    >
      {children}
    </Button>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Top Navbar */}
      <Navbar 
        bg="primary"
        variant="dark"
        expand="lg"
        className="py-2 shadow-sm sticky-top"
      >
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <span 
                className="bg-white text-dark px-2 py-1 rounded-start fw-bold fs-4"
                style={{ letterSpacing: '1px' }}
              >
                Med</span>
              <span 
                className="bg-white text-danger pe-2 py-1 rounded-end fw-bold fs-4"
                style={{ letterSpacing: '1px' }}
              >iva
              </span>
              <span className="ms-3 text-white fs-5">Admin Panel</span>
            </div>
          </Navbar.Brand>
          
          <div className="d-flex align-items-center gap-3">
            <div className="text-end text-white d-none d-md-block">
              <div className="fw-bold">Administrator</div>
              <div className="small opacity-75">ID: {logid || 'ADMIN001'}</div>
            </div>
             
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={handleLogout}
              className="px-3"
            >
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="p-3 p-md-4">
        {/* Header */}
        <div className="mb-4">
          <h2>Admin Dashboard</h2>
          <p className="text-muted">Manage all users, doctors, and shops in one place</p>
        </div>

        {/* Stats Cards */}
        <Row className="mb-4 g-3">
          <Col xs={12} md={6} lg={3}>
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers} 
              iconText="👥"
              color="#4361ee"
              onClick={() => setActiveTab('users')}
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <StatCard 
              title="Total Doctors" 
              value={stats.totalDoctors} 
              iconText="👨‍⚕️"
              color="#06d6a0"
              subtext={`${stats.pendingDoctors} pending verification`}
              onClick={() => setActiveTab('doctors')}
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <StatCard 
              title="Total Shops" 
              value={stats.totalShops} 
              iconText="🏪"
              color="#f8961e"
              subtext={`${stats.pendingShops} pending verification`}
              onClick={() => setActiveTab('shops')}
            />
          </Col>
          <Col xs={12} md={6} lg={3}>
            <StatCard 
              title="Pending Actions" 
              value={stats.pendingDoctors + stats.pendingShops} 
              iconText="⏳"
              color="#ef476f"
              onClick={() => setActiveTab('pending')}
            />
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="mb-4">
          <Col md={8}>
            <InputGroup className="shadow-sm">
              <InputGroup.Text style={{ backgroundColor: '#e9ecef' }}>
                🔍
              </InputGroup.Text>
              <Form.Control
                placeholder={`Search in ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderLeft: 'none' }}
              />
              {searchTerm && (
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setSearchTerm('')}
                  style={{ borderColor: '#dee2e6', borderLeft: 'none' }}
                >
                  Clear
                </Button>
              )}
            </InputGroup>
          </Col>
          <Col md={4} className="mt-2 mt-md-0 d-flex justify-content-md-end">
            <Button 
              variant="primary" 
              onClick={() => {
                console.log('Refreshing data...');
              }}
              className="shadow-sm px-4"
            >
              Refresh Data
            </Button>
          </Col>
        </Row>

        {/* Tabs Navigation */}
        <Card className="shadow-sm border-0">
          <Card.Body className="p-0">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="px-3 pt-3"
              fill
            >
              

              <Tab eventKey="users" title={
                <span className="d-flex align-items-center">
                  <span className="me-2">👥</span>
                  Users ({users.length})
                </span>
              }>
                <div className="p-3">
                  <Table hover responsive striped className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            <p className="text-muted">No users found</p>
                            {searchTerm && (
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => setSearchTerm('')}
                              >
                                Clear Search
                              </Button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map(user => (
                          <tr key={user.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div 
                                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                                  style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}
                                >
                                  {user.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="fw-medium">{user.name}</div>
                                  <small className="text-muted">Joined: {formatDate(user.joined)}</small>
                                </div>
                              </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                              <div className="text-truncate" style={{ maxWidth: '150px' }}>
                                {user.address}
                              </div>
                            </td>
                            <td>
                              <Badge bg={user.status === 'active' ? 'success' : 'secondary'} pill>
                                {user.status}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <ActionButton 
                                  variant="outline-info"
                                  onClick={() => handleViewDetails(user, 'user')}
                                >
                                  View
                                </ActionButton>
                                <ActionButton 
                                  variant="outline-danger"
                                  onClick={() => handleDeleteUser(user._id)}
                                >
                                  Delete
                                </ActionButton>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>

              <Tab eventKey="doctors" title={
                <span className="d-flex align-items-center">
                  <span className="me-2">👨‍⚕️</span>
                  Doctors ({doctors.length})
                  {stats.pendingDoctors > 0 && (
                    <Badge bg="warning" className="ms-2">
                      {stats.pendingDoctors} pending
                    </Badge>
                  )}
                </span>
              }>
                <div className="p-3">
                  <Table hover responsive striped className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Doctor</th>
                        <th>Specialization</th>
                        <th>License</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDoctors.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            <p className="text-muted">No doctors found</p>
                            {searchTerm && (
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => setSearchTerm('')}
                              >
                                Clear Search
                              </Button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        filteredDoctors.map(doctor => (
                          <tr key={doctor.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div 
                                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-2"
                                  style={{ width: '36px', height: '36px', fontSize: '0.8rem' }}
                                >
                                  Dr.
                                </div>
                                <div>
                                  <div className="fw-medium">{doctor.name}</div>
                                  <small className="text-muted">{doctor.email}</small>
                                </div>
                              </div>
                            </td>
                            <td>{doctor.specialization}</td>
                            <td>
                              <code>{doctor.license}</code>
                            </td>
                            <td>
                              <div>{doctor.phone}</div>
                              <small className="text-muted">{doctor.email}</small>
                            </td>
                            <td>
                              {doctor.status === 'verified' ? (
                                <Badge bg="success" pill>
                                  Verified
                                </Badge>
                              ) : (
                                <Badge bg="warning" text="dark" pill>
                                  Pending
                                </Badge>
                              )}
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <ActionButton 
                                  variant="outline-info"
                                  onClick={() => handleViewDetails(doctor, 'doctor')}
                                >
                                  View
                                </ActionButton>
                                {doctor.status === 'pending' && (
                                  <ActionButton 
                                    variant="outline-success"
                                    onClick={() => handleVerifyDoctor(doctor.id)}
                                  >
                                    Verify
                                  </ActionButton>
                                )}
                                <ActionButton 
                                  variant="outline-danger"
                                  onClick={() => handleDeleteDoctor(doctor._id)}
                                >
                                  Delete
                                </ActionButton>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>

              <Tab eventKey="shops" title={
                <span className="d-flex align-items-center">
                  <span className="me-2">🏪</span>
                  Shops ({shops.length})
                  {stats.pendingShops > 0 && (
                    <Badge bg="warning" className="ms-2">
                      {stats.pendingShops} pending
                    </Badge>
                  )}
                </span>
              }>
                <div className="p-3">
                  <Table hover responsive striped className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Shop Name</th>
                        <th>Owner</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredShops.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            <p className="text-muted">No shops found</p>
                            {searchTerm && (
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => setSearchTerm('')}
                              >
                                Clear Search
                              </Button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        filteredShops.map(shop => (
                          <tr key={shop.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div 
                                  className="rounded bg-warning text-dark d-flex align-items-center justify-content-center me-2"
                                  style={{ width: '36px', height: '36px' }}
                                >
                                  🏪
                                </div>
                                <div className="fw-medium">{shop.name}</div>
                              </div>
                            </td>
                            <td>{shop.owner}</td>
                            <td>
                              <div>{shop.email}</div>
                              <small className="text-muted">{shop.phone}</small>
                            </td>
                            <td>
                              <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                {shop.address}
                              </div>
                            </td>
                            <td>
                              {shop.status === 'verified' ? (
                                <Badge bg="success" pill>
                                  Verified
                                </Badge>
                              ) : (
                                <Badge bg="warning" text="dark" pill>
                                  Pending
                                </Badge>
                              )}
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <ActionButton 
                                  variant="outline-info"
                                  onClick={() => handleViewDetails(shop, 'shop')}
                                >
                                  View
                                </ActionButton>
                                {shop.status === 'pending' && (
                                  <ActionButton 
                                    variant="outline-success"
                                    onClick={() => handleVerifyShop(shop.id)}
                                  >
                                    Verify
                                  </ActionButton>
                                )}
                                <ActionButton 
                                  variant="outline-danger"
                                  onClick={() => handleDeleteShop(shop._id)}
                                >
                                  Delete
                                </ActionButton>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Tab>

              <Tab eventKey="pending" title={
                <span className="d-flex align-items-center">
                  <span className="me-2">⏳</span>
                  Pending ({stats.pendingDoctors + stats.pendingShops})
                </span>
              }>
                <div className="p-3">
                  <Row>
                    <Col lg={6}>
                      <Card className="mb-3">
                        <Card.Header className="bg-warning text-dark">
                          <h5 className="mb-0">Pending Doctors ({stats.pendingDoctors})</h5>
                        </Card.Header>
                        <Card.Body>
                          {doctors.filter(d => d.status === 'pending').length > 0 ? (
                            <div className="list-group">
                              {doctors.filter(d => d.status === 'pending').map(doctor => (
                                <div key={doctor.id} className="list-group-item d-flex justify-content-between align-items-center">
                                  <div>
                                    <strong>{doctor.name}</strong>
                                    <div className="text-muted small">{doctor.specialization} • {doctor.license}</div>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <ActionButton 
                                      variant="success"
                                      onClick={() => handleVerifyDoctor(doctor.id)}
                                    >
                                      Verify
                                    </ActionButton>
                                    <ActionButton 
                                      variant="outline-danger"
                                      onClick={() => handleDeleteDoctor(doctor.id)}
                                    >
                                      Reject
                                    </ActionButton>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted text-center my-3">No pending doctors</p>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                    
                    <Col lg={6}>
                      <Card>
                        <Card.Header className="bg-warning text-dark">
                          <h5 className="mb-0">Pending Shops ({stats.pendingShops})</h5>
                        </Card.Header>
                        <Card.Body>
                          {shops.filter(s => s.status === 'pending').length > 0 ? (
                            <div className="list-group">
                              {shops.filter(s => s.status === 'pending').map(shop => (
                                <div key={shop.id} className="list-group-item d-flex justify-content-between align-items-center">
                                  <div>
                                    <strong>{shop.name}</strong>
                                    <div className="text-muted small">{shop.owner} • {shop.license}</div>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <ActionButton 
                                      variant="success"
                                      onClick={() => handleVerifyShop(shop.id)}
                                    >
                                      Verify
                                    </ActionButton>
                                    <ActionButton 
                                      variant="outline-danger"
                                      onClick={() => handleDeleteShop(shop.id)}
                                    >
                                      Reject
                                    </ActionButton>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted text-center my-3">No pending shops</p>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>

        {/* Details Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedItemType === 'user' && '👤 User Details'}
              {selectedItemType === 'doctor' && '👨‍⚕️ Doctor Details'}
              {selectedItemType === 'shop' && '🏪 Shop Details'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <div>
                <div className="text-center mb-4">
                  {selectedItemType === 'user' && (
                    <div 
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                    >
                      {selectedItem.name.charAt(0)}
                    </div>
                  )}
                  {selectedItemType === 'doctor' && (
                    <div 
                      className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '80px', height: '80px', fontSize: '1.5rem' }}
                    >
                      Dr.
                    </div>
                  )}
                  {selectedItemType === 'shop' && (
                    <div 
                      className="rounded bg-warning text-dark d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                    >
                      🏪
                    </div>
                  )}
                  
                  <h4>{selectedItem.name}</h4>
                  {selectedItem.status && (
                    <Badge bg={selectedItem.status === 'verified' || selectedItem.status === 'active' ? 'success' : 'warning'} className="fs-6">
                      {selectedItem.status}
                    </Badge>
                  )}
                </div>
                
                <div className="row">
                  <div className="col-6 mb-3">
                    <div className="text-muted small">Email</div>
                    <div>{selectedItem.email}</div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="text-muted small">Phone</div>
                    <div>{selectedItem.phone}</div>
                  </div>
                </div>
                
                {selectedItem.address && (
                  <div className="mb-3">
                    <div className="text-muted small">Address</div>
                    <div>{selectedItem.address}</div>
                  </div>
                )}
                
                {selectedItem.specialization && (
                  <div className="mb-3">
                    <div className="text-muted small">Specialization</div>
                    <div>{selectedItem.specialization}</div>
                  </div>
                )}
                
                {selectedItem.owner && (
                  <div className="mb-3">
                    <div className="text-muted small">Owner</div>
                    <div>{selectedItem.owner}</div>
                  </div>
                )}
                
                {selectedItem.license && (
                  <div className="mb-3">
                    <div className="text-muted small">License Number</div>
                    <div><code>{selectedItem.license}</code></div>
                  </div>
                )}
                
                {selectedItem.joined && (
                  <div className="mb-3">
                    <div className="text-muted small">Joined Date</div>
                    <div>{formatDate(selectedItem.joined)}</div>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            {selectedItemType === 'doctor' && selectedItem?.status === 'pending' && (
              <Button 
                variant="primary" 
                onClick={() => {
                  handleVerifyDoctor(selectedItem.id);
                  setShowModal(false);
                }}
              >
                Verify Doctor
              </Button>
            )}
            {selectedItemType === 'shop' && selectedItem?.status === 'pending' && (
              <Button 
                variant="primary" 
                onClick={() => {
                  handleVerifyShop(selectedItem.id);
                  setShowModal(false);
                }}
              >
                Verify Shop
              </Button>
            )}
            <Button 
              variant="danger" 
              onClick={() => {
                if (selectedItemType === 'user') handleDeleteUser(selectedItem.id);
                if (selectedItemType === 'doctor') handleDeleteDoctor(selectedItem.id);
                if (selectedItemType === 'shop') handleDeleteShop(selectedItem.id);
                setShowModal(false);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Footer */}
        <div className="mt-4 pt-3 border-top text-center text-muted small">
          <Row>
            <Col md={4}>
              <div className="mb-2">Total Users: {stats.totalUsers}</div>
            </Col>
            <Col md={4}>
              <div className="mb-2">Total Doctors: {stats.totalDoctors}</div>
            </Col>
            <Col md={4}>
              <div className="mb-2">Total Shops: {stats.totalShops}</div>
            </Col>
          </Row>
          <div>Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
      </Container>
    </div>
  );
}

export default Adminhome;