import { Container } from "react-bootstrap";

function ForgeFooter() {
  return (
    <footer className="border-top border-secondary py-4 mt-5 quest-footer">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start">
          <div>
            <h6 className="mb-1 text-light">QuestForge</h6>
            <p className="mb-0 text-secondary">
              AI-powered quest ideas for Dungeon Masters.
            </p>
          </div>

          <div>
            <p className="mb-0 text-secondary">Built by Alessandro</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default ForgeFooter;
