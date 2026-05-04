import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import D20Icon from "./D20icon.jsx";
import BottoneLogin from "./BottoneLogin.jsx";

function NavBar({
  onLoginClick,
  utente,
  onLogoutClick,
  onSavedQuestsClick,
  onCreateQuestClick,
  onHomeClick,
}) {
  return (
    <Navbar className="bg-body-tertiary quest-navbar">
      <Container className="d-flex justify-content-between align-items-center gap-3">
        <Navbar.Brand href="#home" onClick={onHomeClick}>
          <span className="d-inline-flex align-items-center gap-2">
            <D20Icon size={29} className="quest-navbar-icon" />
            <span className="navbar-brand-title">QuestForge</span>
          </span>
        </Navbar.Brand>

        <Stack direction="horizontal" gap={3} className="align-items-center flex-wrap justify-content-end">
          <p
            className="mb-0 quest-navbar-link"
            role="button"
            onClick={onSavedQuestsClick}
          >
            Saved Quest
          </p>
          <p
            className="mb-0 quest-navbar-link"
            role="button"
            onClick={onCreateQuestClick}
          >
            Create Quest
          </p>

          {utente?.name && <span className="quest-navbar-user">Ciao, {utente.name}</span>}
          {utente ? (
            <BottoneLogin label="Logout" variant="outline-danger" onClick={onLogoutClick} />
          ) : (
            <BottoneLogin onClick={onLoginClick} />
          )}
        </Stack>
      </Container>
    </Navbar>
  );
}

export default NavBar;
