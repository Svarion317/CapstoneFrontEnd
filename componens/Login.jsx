import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { apiUrl } from "../src/config/api";

const AUTH_BASE_URL = apiUrl("/api/auth");

function Login({ onSignUpClick, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${AUTH_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      onLoginSuccess(data);
    } catch {
      setError("Unable to contact the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-4 shadow-sm quest-card auth-card auth-card-login">
      <h2 className="mb-3">Login</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Form>

      <p className="mt-3 mb-0 text-center">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onSignUpClick();
          }}
        >
          Sign up
        </a>
      </p>
    </Card>
  );
}

export default Login;
