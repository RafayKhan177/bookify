import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>bookify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/" style={{textDecoration:"none" ,color:"rgb(182, 182, 182)",margin:"0 .5rem"}} >Home</NavLink>
            <NavLink to="/book/list" style={{textDecoration:"none" ,color:"rgb(182, 182, 182)",margin:"0 .5rem"}} >Add Book</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
