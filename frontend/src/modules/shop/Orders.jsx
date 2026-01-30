import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';

function Orders() {
  const { shopData } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  
  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      try {
        // Replace with actual API call
        const response = await axios.get(`http://localhost:8000/api/shop/orders/${shopData._id}`);
        setOrders(response.data.orders);
        console.log(response.data.orders)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [shopData]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'shipped': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };
  
  const filteredOrders = filter === 'all' 
  ? orders 
  : orders.filter(order => order.status === filter);
  
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Replace with actual API call
      await axios.put(`http://localhost:8000/api/shop/orderstatus/${orderId}`, {status:newStatus});
      
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  

  return (
    <Container fluid>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">Orders Management</h2>
              <p className="text-muted mb-0">Manage and track customer orders</p>
            </div>
            <div className="d-flex gap-2">
              <Form.Select 
                style={{ width: '200px' }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </div>
          </div>
        </Col>
      </Row>

      
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              {filteredOrders.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted">No orders found</h5>
                  <p className="text-muted">There are no orders matching your current filter.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <strong>{order.orderid}</strong>
                          </td>
                          <td>
                            <div>
                           
                              <small className="text-muted">{order.phone}</small>
                              <br />
                              <small className="text-muted">{order.address}</small>
                            </div>
                          </td>
                          <td>
                            <div>
                                <div  className="mb-1">
                                  <small>
                                    {order.productid.name} × {order.quantity} - ${order.productid.price}
                                  </small>
                                </div>
                            </div>
                          </td>
                          <td>
                            <strong>${order.totalprice}</strong>
                          </td>
                          <td>
                            <Badge bg={getStatusVariant(order.status)}>
                              {order.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td>
                            <small>
                              {new Date(order.orderdate).toLocaleDateString()}
                              <br />
                              {new Date(order.orderdate).toLocaleTimeString()}
                            </small>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => updateOrderStatus(order._id, 'confirmed')}
                                disabled={order.status !== 'pending'}
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={() => updateOrderStatus(order._id, 'shipped')}
                                disabled={order.status !== 'confirmed'}
                              >
                                Ship
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => updateOrderStatus(order._id, 'cancelled')}
                                disabled={order.status === 'completed' || order.status === 'cancelled'}
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

export default Orders;