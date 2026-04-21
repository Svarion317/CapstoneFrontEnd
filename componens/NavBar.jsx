import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import D20Icon from "./D20icon.jsx";

function NavBar() {
  return (
    <>
      <Navbar className="bg-body-tertiary quest-navbar">
        <Container>
          <Navbar.Brand href="#home">
            <span className="d-inline-flex align-items-center gap-2">
              <D20Icon size={29} className="quest-navbar-icon" />
              <span className="navbar-brand-title">QuestForge</span>
            </span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
