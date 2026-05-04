function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Configure your party",
      text: "Choose players, level, classes and mission type.",
      type: "setup",
    },
    {
      number: "02",
      title: "Forge the quest",
      text: "Generate plot hooks, NPCs, threats and twists.",
      type: "forge",
    },
    {
      number: "03",
      title: "Save your legend",
      text: "Keep your quest, add notes and reopen it later.",
      type: "save",
    },
  ];

  return (
    <section className="how-section">
      <div className="how-header">
        <span className="how-eyebrow">WHAT IS IT?</span>
        <h2>From spark to session-ready quest</h2>
        <p>
          Choose your party, pick a mission and tone - QuestForge builds a
          ready-to-play quest in seconds.
        </p>
      </div>

      <div className="how-grid">
        {steps.map((step) => (
          <article className="how-card" key={step.number}>
            <div className="how-card-top">
              <span className="how-number">STEP {step.number}</span>
              <div className="how-icon" aria-hidden="true">
                {step.type === "setup" && (
                  <svg viewBox="0 0 24 24">
                    <path d="M4 20h16" />
                    <path d="M7 20V9l5-5 5 5v11" />
                    <path d="M9 12h6" />
                    <path d="M10 16h4" />
                  </svg>
                )}

                {step.type === "forge" && (
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2l2.2 6.2L21 10l-5.2 4.2L17.5 21 12 17.2 6.5 21l1.7-6.8L3 10l6.8-1.8L12 2z" />
                  </svg>
                )}

                {step.type === "save" && (
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h12v18l-6-3-6 3V3z" />
                    <path d="M9 7h6" />
                    <path d="M9 11h6" />
                  </svg>
                )}
              </div>
            </div>

            <h3>{step.title}</h3>
            <p>{step.text}</p>

            <div className={`how-mockup how-mockup-${step.type}`}>
              {step.type === "setup" && (
                <>
                  <div className="how-row">
                    <span>Players</span>
                    <strong>4</strong>
                  </div>
                  <div className="how-row">
                    <span>Level</span>
                    <strong>5</strong>
                  </div>
                  <div className="how-pill-row">
                    <span>Dungeon Crawl</span>
                    <span>Investigation</span>
                  </div>
                </>
              )}

              {step.type === "forge" && (
                <>
                  <div className="how-quest-title">The Ashen Crypt</div>
                  <div className="how-line"></div>
                  <div className="how-line short"></div>
                  <div className="how-tag-row">
                    <span>NPC</span>
                    <span>Twist</span>
                    <span>Threat</span>
                  </div>
                </>
              )}

              {step.type === "save" && (
                <>
                  <div className="how-check-row">
                    <span></span>
                    <p>The Hollow Crown</p>
                  </div>
                  <div className="how-check-row">
                    <span></span>
                    <p>Wolves of Blackpine</p>
                  </div>
                  <div className="how-check-row">
                    <span></span>
                    <p>Relic under Emberfall</p>
                  </div>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="how-cta-row">
        <button
          type="button"
          className="btn quest-button btn-warning how-cta-button"
        >
          Generate a quest
        </button>
        <p className="how-cta-helper mb-0">Sign up — it's free!</p>
      </div>
    </section>
  );
}

export default HowItWorks;
