import Button from "react-bootstrap/Button";

function BottoneLogin({ onClick, label = "Login", variant = "outline-primary" }) {
  return (
    <Button variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
}

export default BottoneLogin;
