import "./App.css";
import { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "../componens/NavBar";
import Hero from "../componens/Hero";
import QuestForm from "../componens/QuestForm";
import HowItWorks from "../componens/HowItWorks";
import ForgeFooter from "../componens/ForgeFooter";
import Login from "../componens/Login";
import Singup from "../componens/Singup";
import MySavedQuest from "../componens/MySavedQuest";

function AppContent() {
  const [showAuth, setShowAuth] = useState(false);
  const [showSingup, setShowSingup] = useState(false);
  const [utente, setUtente] = useState(() => {
    const savedUtente = localStorage.getItem("utente");
    return savedUtente ? JSON.parse(savedUtente) : null;
  });
  const navigate = useNavigate();

  function handleAuthSuccess(data) {
    if (data?.token) {
      localStorage.setItem("token", data.token);
    }
    if (data?.utente) {
      localStorage.setItem("utente", JSON.stringify(data.utente));
      setUtente(data.utente);
    }
    setShowAuth(false);
    setShowSingup(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("utente");
    setUtente(null);
  }

  function handleGenerateQuestClick() {
    if (utente && localStorage.getItem("token")) {
      navigate("/create-quest");
      return;
    }

    setShowSingup(false);
    setShowAuth(true);
  }

  return (
    <div className="app-shell">
      <NavBar
        onLoginClick={() => {
          setShowAuth(true);
          setShowSingup(false);
        }}
        onSavedQuestsClick={() => navigate("/saved-quests")}
        onCreateQuestClick={() => navigate("/create-quest")}
        onHomeClick={(event) => {
          event.preventDefault();
          navigate("/");
        }}
        utente={utente}
        onLogoutClick={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Hero />
              <HowItWorks
                isAuthenticated={Boolean(utente)}
                onGenerateQuestClick={handleGenerateQuestClick}
              />
            </>
          )}
        />
        <Route
          path="/create-quest"
          element={(
            <Container className="py-5 main-content-shell">
              <QuestForm />
            </Container>
          )}
        />
        <Route
          path="/saved-quests"
          element={(
            <Container className="py-5 main-content-shell">
              <MySavedQuest />
            </Container>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Modal show={showAuth} onHide={() => setShowAuth(false)} centered>
        <Modal.Body className="d-flex justify-content-center p-4">
          {showSingup ? (
            <Singup
              onBackToLogin={() => setShowSingup(false)}
              onRegisterSuccess={handleAuthSuccess}
            />
          ) : (
            <Login onSignUpClick={() => setShowSingup(true)} onLoginSuccess={handleAuthSuccess} />
          )}
        </Modal.Body>
      </Modal>

      <ForgeFooter />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
