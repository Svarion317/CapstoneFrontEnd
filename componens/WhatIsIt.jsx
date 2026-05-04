import { Card } from "react-bootstrap";

function WhatIsIt() {
  return (
    <section className="what-is-it-section" aria-labelledby="what-is-it-title">
      <Card className="quest-card what-is-it-card">
        <Card.Body className="p-4 p-md-5">
          <span className="quest-form-kicker">What is it?</span>
          <h2 id="what-is-it-title" className="what-is-it-title">
            QuestForge is a D&D quest generator for your next session
          </h2>
          <p className="what-is-it-copy mb-0">
            You choose party setup, mission type, tone, and extra options.
            QuestForge builds a ready-to-play quest in seconds, then you can
            save it and reopen it later from your saved quests.
          </p>
        </Card.Body>
      </Card>
    </section>
  );
}

export default WhatIsIt;
