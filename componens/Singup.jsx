import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

const AUTH_BASE_URL = "http://localhost:3000/api/auth";

function Singup({ onBackToLogin, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    birthDate: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${AUTH_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registrazione fallita");
        return;
      }

      onRegisterSuccess(data);
    } catch {
      setError("Impossibile contattare il server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-4 shadow-sm quest-card auth-card auth-card-signup">
      <h2 className="mb-3">Singup</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="signupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il cognome"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci l'email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupBirthDate">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci la password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100 mb-2" disabled={loading}>
          {loading ? "Registrazione..." : "Iscriviti"}
        </Button>
      </Form>

      <Button variant="link" onClick={onBackToLogin} className="p-0 align-self-start">
        Torna al login
      </Button>
    </Card>
  );
}

export default Singup;
