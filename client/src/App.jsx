import { Navbar, Nav, NavLink, NavbarBrand } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar color="warning" expand="md">
        <Nav navbar>
          <NavbarBrand href="/">Hillarys Hair Care</NavbarBrand>
          <NavLink href="/services"> Services </NavLink>
          <NavLink href="/customers"> Customers </NavLink>
          <NavLink href="/stylists"> Stylists </NavLink>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App;
