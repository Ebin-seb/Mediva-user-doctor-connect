import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal } from 'react-bootstrap';

function Userorder() {
  const [showModal, setShowModal] = useState(false);
  const [ products,setproduct]= useState()
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders,setorder] = useState([])
const userid = localStorage.getItem('userid')
  const userorders = async()=>{
    try{
        const response= await axios.get(`http://localhost:8000/api/user/vieworders/${userid}`)
        setorder(response.data.order)
        setproduct(response.data.product)
        console.log(response.data.product)
    }
    catch(e){
        console.log(e)
    }
  }
  useEffect(()=>{userorders()},[])
const cancelorder  = async(id)=>{
    try{
      console.log(id)
      const response = await axios.delete(`http://localhost:8000/api/user/cancelorder/${id}`)
      alert(response.data.message)
      setShowModal(false)
      window.location.reload()
    }
    catch(e){
      console.log(e)
    }
}
  

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'processing': return 'warning';
      case 'shipped': return 'primary';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <>
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold" style={{ color: '#1e293b' }}>My Orders</h2>
            <p className="text-muted">View and manage your orders</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0 fw-semibold">Order History</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Items</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order,i) => (
                        <tr key={order.orderid} className="border-bottom">
                          <td className="px-4 py-3">
                            <span className="fw-semibold" style={{ color: '#e11d48' }}>
                              {order.orderid}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {order.orderdate}
                          </td>
                          <td className="px-4 py-3">
                           <div>
                            {products.map((product,i)=>(

                               <div key={i} className="text-muted small">
                                 {product.name} × {order.quantity}
                               </div>
                            ))}
                            
                           </div>
                          </td>
                          <td className="px-4 py-3 fw-semibold">
                            ${order.totalprice.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <Badge 
                              bg={getStatusVariant(order.status)}
                              className="px-3 py-2"
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleShowDetails(order)}
                              className="me-2"
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {orders.length === 0 && (
                  <div className="text-center py-5">
                    <div className="mb-3">
                      <i className="fas fa-box-open fa-3x text-muted"></i>
                    </div>
                    <h5 className="text-muted">No orders found</h5>
                    <p className="text-muted">You haven't placed any orders yet.</p>
                    <Button variant="primary">Start Shopping</Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

       
      </Container>

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details - {selectedOrder?.orderid}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Row>
              <Col md={6}>
                <h6 className="fw-semibold mb-3">Order Information</h6>
                <div className="mb-2">
                  <small className="text-muted">Order Date:</small>
                  <div className="fw-semibold">
                    {selectedOrder.orderdate}
                  </div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Status:</small>
                  <div>
                    <Badge bg={getStatusVariant(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <h6 className="fw-semibold mb-3">Shipping Information</h6>
                <div className="mb-2">
                  <small className="text-muted">Phone:</small>
                  <div className="fw-semibold">{selectedOrder.phone}</div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Address:</small>
                  <div className="fw-semibold">{selectedOrder.address}</div>
                </div>
              </Col>

              <Col md={12} className="mt-4">
                <h6 className="fw-semibold mb-3">Order Items</h6>
                <Table bordered>
                  <thead className="bg-light">
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {product.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.stock}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.stock * item.price).toFixed(2)}</td>
                      </tr>
                    ))} */}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end fw-semibold">Total:</td>
                      <td className="fw-bold text-primary">
                        ${selectedOrder.totalprice.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {selectedOrder?.status === 'Delivered' && (
            <Button variant="success">
              Download Invoice
            </Button>
          )}
          {selectedOrder?.status !== 'Cancelled' && selectedOrder?.status !== 'Delivered' && (
            <Button onClick={()=>cancelorder(selectedOrder._id)} variant="outline-danger">
              Cancel Order
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Userorder;