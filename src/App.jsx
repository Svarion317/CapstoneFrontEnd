import "./App.css";
import NavBar from "../componens/NavBar";
import Hero from "../componens/Hero";
import { Container } from "react-bootstrap";
import QuestForm from "../componens/QuestForm";
import ForgeFooter from "../componens/ForgeFooter";
import Prova from "../componens/Prova";

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <Hero />
      <Container className="py-5 main-content-shell">
        <QuestForm />
      </Container>
      <ForgeFooter />
    </div>
  );
}

export default App;
