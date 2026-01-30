import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'

function Navbars() {
  return (
    <Navbar className="bg-dark p-2">
      <Container>
        <Navbar.Brand href="/" className='text-danger fs-3 fw-bolder'>MEDIEVA</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
         <Link to={"/login"}><Navbar.Text className='text-black fs-5 bg-white p-1 rounded'>Login</Navbar.Text></Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;