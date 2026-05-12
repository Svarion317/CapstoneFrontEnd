import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const availableClasses = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

const missionTypes = [
  "Escort",
  "Dungeon Crawl",
  "Treasure Hunt",
  "Monster Hunt",
  "Investigation",
  "Rescue Mission",
  "Political Intrigue",
];

const tones = [
  "Epic",
  "Dark Fantasy",
  "Horror",
  "Lighthearted",
  "Mystery",
  "Gritty",
  "Heroic",
  "Mythic",
  "Survival",
  "Occult",
];

function QuestIcon({ name }) {
  const icons = {
    users: (
      <path d="M10 11a3 3 0 1 0-2.999-3A3 3 0 0 0 10 11Zm-6 3.5A2.5 2.5 0 0 1 6.5 12h7A2.5 2.5 0 0 1 16 14.5V15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-.5Zm10.5-3.55a2.5 2.5 0 1 0-1.04-4.774 4.5 4.5 0 0 1 0 3.548c.326.138.695.226 1.04.226ZM14 12c-.316 0-.621.043-.91.123.64.535 1.06 1.34 1.06 2.227V15h2.35a.5.5 0 0 0 .5-.5 2.5 2.5 0 0 0-3-2.45Z" />
    ),
    stars: (
      <path d="m8 1.314 1.962 3.976 4.388.638-3.175 3.095.75 4.37L8 11.33l-3.925 2.063.75-4.37L1.65 5.928l4.388-.638L8 1.314Z" />
    ),
    dice: (
      <path d="M2.5 2.5h11v11h-11v-11Zm1 1v9h9v-9h-9Zm1.75 1.75h1.5v1.5h-1.5v-1.5Zm4 0h1.5v1.5h-1.5v-1.5Zm-2 2h1.5v1.5h-1.5v-1.5Zm-2 2h1.5v1.5h-1.5v-1.5Zm4 0h1.5v1.5h-1.5v-1.5Z" />
    ),
    map: (
      <path d="M15.817 2.113A.5.5 0 0 0 15.5 2h-.06l-4.44 1.11-5-1.11a.5.5 0 0 0-.183 0l-4 1A.5.5 0 0 0 1.5 3.5v10a.5.5 0 0 0 .683.474L6 12.89l5 1.11a.5.5 0 0 0 .183 0l4-1A.5.5 0 0 0 15.5 12.5v-10a.5.5 0 0 0-.183-.387ZM10.5 4.11v8.78l-4-0.89V3.22l4 .89Zm-8 0.03 3-.75v8.5l-3 .75v-8.5Zm12 8.11-3 .75V4.39l3-.75v8.5Z" />
    ),
    moon: <path d="M11.4 1.2a6 6 0 1 0 3.4 10.94A5.2 5.2 0 1 1 11.4 1.2Z" />,
    spark: (
      <path d="M8 0 6.8 4.8 2 6l4.8 1.2L8 12l1.2-4.8L14 6 9.2 4.8 8 0Zm-5 10-.75 2.25L0 13l2.25.75L3 16l.75-2.25L6 13l-2.25-.75L3 10Z" />
    ),
    scroll: (
      <path d="M4.5 1A2.5 2.5 0 0 0 2 3.5V12a3 3 0 0 0 3 3h7.5a1.5 1.5 0 0 0 0-3H6a1 1 0 0 1 0-2h6.5A2.5 2.5 0 0 0 15 7.5v-4A2.5 2.5 0 0 0 12.5 1h-8Zm8 1A1.5 1.5 0 0 1 14 3.5v4A1.5 1.5 0 0 1 12.5 9H6a1.99 1.99 0 0 0-1.5.68V3.5A1.5 1.5 0 0 1 6 2h6.5Z" />
    ),
  };

  return (
    <span className="quest-icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="currentColor">
        {icons[name]}
      </svg>
    </span>
  );
}

function StepperField({
  label,
  helper,
  value,
  min,
  max,
  onChange,
  icon,
  controlId,
}) {
  return (
    <Form.Group controlId={controlId} className="config-control">
      <Form.Label className="config-label">
        <QuestIcon name={icon} />
        <span>{label}</span>
      </Form.Label>
      <div className="config-helper">{helper}</div>
      <div className="stepper-shell">
        <Button
          type="button"
          variant="link"
          className="stepper-button"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          -
        </Button>
        <div className="stepper-value">{value}</div>
        <Button
          type="button"
          variant="link"
          className="stepper-button"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </Button>
      </div>
    </Form.Group>
  );
}

function PillSelector({ label, helper, value, options, onChange, icon }) {
  return (
    <div className="config-control">
      <div className="config-label">
        <QuestIcon name={icon} />
        <span>{label}</span>
      </div>
      <div className="config-helper">{helper}</div>
      <div className="pill-grid">
        {options.map((option) => (
          <Button
            key={option}
            type="button"
            variant="link"
            className={`pill-option ${value === option ? "is-active" : ""}`}
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

function QuestForm() {
  const [players, setPlayers] = useState(1);
  const [level, setLevel] = useState(1);
  const [classes, setClasses] = useState([""]);
  const [missionType, setMissionType] = useState("");
  const [tone, setTone] = useState("");
  const [generateNpc, setGenerateNpc] = useState(false);
  const [includeTwist, setIncludeTwist] = useState(false);
  const [generatedQuest, setGeneratedQuest] = useState("");
  const [generatedQuestTitle, setGeneratedQuestTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  const formatQuestResult = (result) => {
    if (!result) return "";
    if (typeof result === "string") return result;

    if (typeof result === "object") {
      const sections = [];
      const formatLocations = (locations) =>
        locations
          .map((location, index) => {
            if (typeof location === "string") {
              return `${index + 1}. ${location}`;
            }

            return [
              `${index + 1}. ${location.name || "Location"}`,
              location.description,
              location.dm_note && `DM Note: ${location.dm_note}`,
            ]
              .filter(Boolean)
              .join("\n");
          })
          .join("\n\n");

      const formatEncounters = (encounters) =>
        encounters
          .map((encounter, index) => {
            if (typeof encounter === "string") {
              return `${index + 1}. ${encounter}`;
            }

            return [
              `${index + 1}. ${encounter.title || "Encounter"}`,
              encounter.type && `Type: ${encounter.type}`,
              encounter.description,
              encounter.dm_tip && `DM Tip: ${encounter.dm_tip}`,
            ]
              .filter(Boolean)
              .join("\n");
          })
          .join("\n\n");

      const formatNpc = (npc) => {
        if (typeof npc === "string") return npc;

        return [
          npc.name && `Name: ${npc.name}`,
          npc.role && `Role: ${npc.role}`,
          npc.personality && `Personality: ${npc.personality}`,
          npc.secret && `Secret: ${npc.secret}`,
        ]
          .filter(Boolean)
          .join("\n");
      };

      if (result.title) sections.push(`Quest Title: ${result.title}`);
      if (result.hook) sections.push(`Hook:\n${result.hook}`);
      if (result.introduction) {
        sections.push(`Short Introduction:\n${result.introduction}`);
      }
      if (result.objective)
        sections.push(`Main Objective:\n${result.objective}`);
      if (Array.isArray(result.locations) && result.locations.length > 0) {
        sections.push(`Locations:\n${formatLocations(result.locations)}`);
      }
      if (Array.isArray(result.encounters) && result.encounters.length > 0) {
        sections.push(`Encounters:\n${formatEncounters(result.encounters)}`);
      }
      if (result.obstacle) sections.push(`Main Obstacle:\n${result.obstacle}`);
      if (result.reward) sections.push(`Reward:\n${result.reward}`);
      if (result.npc) sections.push(`NPC:\n${formatNpc(result.npc)}`);
      if (result.twist) sections.push(`Narrative Twist:\n${result.twist}`);

      if (sections.length > 0) {
        return sections.join("\n\n");
      }

      return JSON.stringify(result, null, 2);
    }

    return String(result);
  };

  const handlePlayersChange = (count) => {
    setPlayers(count);

    setClasses((prev) => {
      const updated = [...prev];

      if (count > updated.length) {
        while (updated.length < count) {
          updated.push("");
        }
      } else {
        updated.length = count;
      }

      return updated;
    });
  };

  const handleClassChange = (index, value) => {
    const updatedClasses = [...classes];
    updatedClasses[index] = value;
    setClasses(updatedClasses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGeneratedQuest("");
    setGeneratedQuestTitle("");
    setSaveError("");
    setSaveSuccess("");

    const formData = {
      players,
      level,
      classes,
      missionType,
      tone,
      generateNpc,
      includeTwist,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in before generating a quest.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:3000/api/groq/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate quest");
      }

      const formattedQuest = formatQuestResult(data.result);
      setGeneratedQuest(formattedQuest);
      setGeneratedQuestTitle(extractQuestTitle(data.result || formattedQuest));
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const extractQuestTitle = (value) => {
    if (!value) return "";
    if (typeof value === "object" && !Array.isArray(value)) {
      if (typeof value.title === "string" && value.title.trim()) {
        return value.title.trim();
      }
    }

    const text = typeof value === "string" ? value : formatQuestResult(value);
    if (!text) return "";

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const normalizeLine = (line) =>
      line
        .replace(/^[\d)\].\-\s]*/g, "")
        .replace(/[*_`#]/g, "")
        .trim();

    const isSectionLabel = (line) =>
      /^(quest title|title|hook|short introduction|main objective|locations|encounters|main obstacle|reward|npc|plot twist|narrative twist)\s*:?\s*$/i.test(
        normalizeLine(line).toLowerCase(),
      );

    for (let i = 0; i < lines.length; i += 1) {
      const cleaned = normalizeLine(lines[i]);

      if (/^quest title\s*:?/i.test(cleaned.toLowerCase())) {
        const sameLineTitle = cleaned.replace(/^quest title\s*:?/i, "").trim();

        if (sameLineTitle) {
          return sameLineTitle;
        }

        for (let j = i + 1; j < lines.length; j += 1) {
          if (!isSectionLabel(lines[j])) {
            return normalizeLine(lines[j]);
          }
        }
      }
    }

    for (const line of lines) {
      const cleanedLine = normalizeLine(line);
      const lower = cleanedLine.toLowerCase();

      if (lower.startsWith("quest title:")) {
        return cleanedLine.replace(/^quest title:\s*/i, "").trim();
      }

      if (lower.startsWith("title:")) {
        return cleanedLine.replace(/^title:\s*/i, "").trim();
      }
    }

    const fallbackLine = lines.find(
      (line) =>
        !/here is your dungeons\s*&?\s*dragons quest:?/i.test(line) &&
        !isSectionLabel(line),
    );

    return normalizeLine(fallbackLine || lines[0]);
  };

  const handleSaveQuest = async () => {
    setSaveError("");
    setSaveSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setSaveError("You need to log in before saving a quest.");
      return;
    }

    const payload = {
      title:
        generatedQuestTitle || `${missionType || "Quest"} - Level ${level}`,
      prompt: JSON.stringify({
        players,
        level,
        classes,
        missionType,
        tone,
        generateNpc,
        includeTwist,
      }),
      questText: generatedQuest,
      metadata: {
        players,
        level,
        classes,
        missionType,
        tone,
        generateNpc,
        includeTwist,
      },
    };

    try {
      setIsSaving(true);

      const response = await fetch("http://localhost:3000/api/saved-quests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Save failed");
      }

      setSaveSuccess("Quest saved successfully.");
    } catch (err) {
      setSaveError(err.message || "Error while saving");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="quest-card quest-configurator">
      <Card.Body className="p-0">
        <div className="quest-form-shell">
          <div className="quest-form-main">
            <div className="quest-form-header">
              <span className="quest-form-kicker">Quest Configurator</span>
              <h2>Forge Your Next Adventure</h2>
              <p>Build a custom quest idea for your next D&D session.</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <div className="form-section">
                <div className="form-section-heading">
                  <h3>Party Setup</h3>
                  <p>Define the group stepping into the dungeon.</p>
                </div>

                <Row className="g-4">
                  <Col md={6}>
                    <StepperField
                      controlId="players"
                      label="Number of Players"
                      helper="Choose the party size for this run."
                      value={players}
                      min={1}
                      max={8}
                      onChange={handlePlayersChange}
                      icon="users"
                    />
                  </Col>

                  <Col md={6}>
                    <StepperField
                      controlId="level"
                      label="Average Party Level"
                      helper="Set the power curve of the encounter."
                      value={level}
                      min={1}
                      max={20}
                      onChange={setLevel}
                      icon="stars"
                    />
                  </Col>

                  <Col xs={12}>
                    <Form.Group controlId="classes" className="config-control">
                      <Form.Label className="config-label">
                        <QuestIcon name="dice" />
                        <span>Party Classes</span>
                      </Form.Label>
                      <div className="config-helper">
                        Pick the archetypes in your current adventuring party.
                      </div>
                      <Row className="g-3">
                        {classes.map((selectedClass, index) => (
                          <Col md={6} key={index}>
                            <Form.Select
                              className="quest-input"
                              value={selectedClass}
                              onChange={(e) =>
                                handleClassChange(index, e.target.value)
                              }
                            >
                              <option value="">
                                Select class for player {index + 1}
                              </option>
                              {availableClasses.map((className) => (
                                <option key={className} value={className}>
                                  {className}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        ))}
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="form-section">
                <div className="form-section-heading">
                  <h3>Adventure Setup</h3>
                  <p>Shape the mission and atmosphere of the quest.</p>
                </div>

                <Row className="g-4">
                  <Col xs={12}>
                    <PillSelector
                      label="Mission Type"
                      helper="Select the core structure of the quest."
                      value={missionType}
                      options={missionTypes}
                      onChange={setMissionType}
                      icon="map"
                    />
                  </Col>

                  <Col xs={12}>
                    <PillSelector
                      label="Tone"
                      helper="Tune the emotional and narrative feel."
                      value={tone}
                      options={tones}
                      onChange={setTone}
                      icon="moon"
                    />
                  </Col>
                </Row>
              </div>

              <div className="form-section">
                <div className="form-section-heading">
                  <h3>Extra Options</h3>
                  <p>Add encounter layers and narrative flavor.</p>
                </div>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="toggle-card">
                      <div>
                        <div className="config-label mb-1">
                          <QuestIcon name="scroll" />
                          <span>Generate NPCs</span>
                        </div>
                        <div className="config-helper mb-0">
                          Include supporting characters and contacts.
                        </div>
                      </div>
                      <Form.Check
                        type="switch"
                        checked={generateNpc}
                        onChange={(e) => setGenerateNpc(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="toggle-card">
                      <div>
                        <div className="config-label mb-1">
                          <QuestIcon name="spark" />
                          <span>Narrative Twist</span>
                        </div>
                        <div className="config-helper mb-0">
                          Introduce a hidden reveal or betrayal.
                        </div>
                      </div>
                      <Form.Check
                        type="switch"
                        checked={includeTwist}
                        onChange={(e) => setIncludeTwist(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <Button
                variant="warning"
                type="submit"
                className="fw-bold quest-button quest-button-wide"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Quest"}
              </Button>

              {error && (
                <div className="mt-4 text-danger fw-semibold">{error}</div>
              )}

              {generatedQuest && (
                <Card className="mt-4 quest-result-card">
                  <Card.Body>
                    <div className="form-section-heading mb-3">
                      <h3>Your adventure is ready!</h3>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {generatedQuest}
                    </div>
                    <Button
                      variant="success"
                      type="button"
                      className="mt-4 fw-bold"
                      onClick={handleSaveQuest}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                    {saveError && (
                      <div className="mt-3 text-danger fw-semibold">
                        {saveError}
                      </div>
                    )}
                    {saveSuccess && (
                      <div className="mt-3 text-success fw-semibold">
                        {saveSuccess}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              )}
            </Form>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default QuestForm;
