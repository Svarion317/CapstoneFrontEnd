import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap";

const SAVED_QUESTS_URL = "http://localhost:3000/api/saved-quests";

function MySavedQuest() {
  const [quests, setQuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [openQuestId, setOpenQuestId] = useState("");

  async function loadSavedQuests() {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Devi fare login per vedere le quest salvate.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(SAVED_QUESTS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errore nel caricamento delle quest salvate");
      }

      setQuests(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Errore nel caricamento delle quest salvate");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSavedQuests();
  }, []);

  async function handleDelete(id) {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token mancante. Effettua di nuovo il login.");
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`${SAVED_QUESTS_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Eliminazione fallita");
      }

      setQuests((current) => current.filter((quest) => quest._id !== id));
    } catch (err) {
      setError(err.message || "Errore durante l'eliminazione");
    } finally {
      setDeletingId("");
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5 my-saved-loading">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="my-saved-shell">
      <h2 className="mb-3 my-saved-title">My Saved Quest</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {!error && quests.length === 0 && (
        <Alert variant="secondary">Nessuna quest salvata al momento.</Alert>
      )}

      <Row className="g-3">
        {quests.map((quest) => (
          <Col key={quest._id} xs={12}>
            <Card className="quest-card my-saved-card">
              <Card.Body>
                <Card.Title
                  className="mb-0 my-saved-card-title"
                  role="button"
                  onClick={() =>
                    setOpenQuestId((current) =>
                      current === quest._id ? "" : quest._id,
                    )
                  }
                >
                  {quest.title || "Quest"}
                </Card.Title>

                {openQuestId === quest._id && (
                  <>
                    <Card.Text className="mt-3 my-saved-card-text" style={{ whiteSpace: "pre-wrap" }}>
                      {quest.questText}
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      type="button"
                      onClick={() => handleDelete(quest._id)}
                      disabled={deletingId === quest._id}
                    >
                      {deletingId === quest._id ? "Eliminazione..." : "Elimina"}
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MySavedQuest;
