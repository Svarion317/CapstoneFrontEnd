import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { apiUrl } from "../src/config/api";

const difficultyOptions = ["easy", "medium", "hard", "deadly"];
const levelOptions = Array.from({ length: 20 }, (_, index) => index + 1);
const ENCOUNTER_RANDOM_URL = apiUrl("/api/encounters/random");

const notAvailable = "Not available";

function formatValue(value) {
  return value === null || value === undefined || value === ""
    ? notAvailable
    : value;
}

function formatLabel(label) {
  return label
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase();
}

function formatObjectValue(value) {
  if (!value || typeof value !== "object") {
    return formatValue(value);
  }

  const preferredValue =
    value.name || value.index || value.desc || value.description;

  if (preferredValue) {
    return preferredValue;
  }

  const entries = Object.entries(value)
    .filter(
      ([, entryValue]) =>
        entryValue !== null && entryValue !== undefined && entryValue !== "",
    )
    .map(([key, entryValue]) => `${formatLabel(key)}: ${entryValue}`);

  return entries.length > 0 ? entries.join(", ") : notAvailable;
}

function formatList(value) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return notAvailable;
    }

    return (
      value
        .map((item) => {
          if (item === null || item === undefined || item === "") {
            return "";
          }

          if (typeof item !== "object") {
            return item;
          }

          return formatObjectValue(item);
        })
        .filter(Boolean)
        .join(", ") || notAvailable
    );
  }

  if (value && typeof value === "object") {
    return formatObjectValue(value);
  }

  return formatValue(value);
}

function formatSpeed(speed) {
  if (!speed) {
    return notAvailable;
  }

  if (typeof speed === "string") {
    return speed;
  }

  if (typeof speed === "object") {
    const speedEntries = Object.entries(speed)
      .filter(
        ([, value]) => value !== null && value !== undefined && value !== "",
      )
      .map(([key, value]) => `${formatLabel(key)}: ${value}`);

    return speedEntries.length > 0 ? speedEntries.join(", ") : notAvailable;
  }

  return formatValue(speed);
}

function formatTextBlocks(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return notAvailable;
  }

  return (
    value
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        const name = item?.name || item?.title;
        const description = item?.desc || item?.description || item?.text;

        return [name, description].filter(Boolean).join(": ");
      })
      .filter(Boolean)
      .join("\n\n") || notAvailable
  );
}

function getAbilityScore(monster, shortName, longName) {
  return (
    monster?.[shortName] ??
    monster?.[longName] ??
    monster?.abilities?.[shortName] ??
    monster?.abilities?.[longName] ??
    monster?.abilityScores?.[shortName] ??
    monster?.abilityScores?.[longName]
  );
}

function EncounterRandomizer() {
  const [players, setPlayers] = useState(4);
  const [level, setLevel] = useState(3);
  const [difficulty, setDifficulty] = useState("medium");
  const [encounterResult, setEncounterResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedMonsterKeys, setExpandedMonsterKeys] = useState([]);

  async function handleGenerateEncounter(event) {
    event.preventDefault();

    const normalizedPlayers = Math.min(8, Math.max(1, Number(players) || 1));
    const normalizedLevel = Math.min(20, Math.max(1, Number(level) || 1));
    const token = localStorage.getItem("token");

    setPlayers(normalizedPlayers);
    setLevel(normalizedLevel);

    if (!token) {
      setError("You need to log in before generating an encounter.");
      setEncounterResult(null);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(ENCOUNTER_RANDOM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          players: normalizedPlayers,
          level: normalizedLevel,
          difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate encounter");
      }

      setEncounterResult(data);
      setExpandedMonsterKeys([]);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setEncounterResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  const encounter = encounterResult?.encounter;
  const monsters = Array.isArray(encounter?.monsters) ? encounter.monsters : [];

  function toggleMonsterDetails(monsterKey) {
    setExpandedMonsterKeys((currentKeys) =>
      currentKeys.includes(monsterKey)
        ? currentKeys.filter((key) => key !== monsterKey)
        : [...currentKeys, monsterKey],
    );
  }

  return (
    <div className="encounter-page">
      <header className="encounter-header">
        <span className="encounter-kicker">Combat Builder</span>
        <h2>Encounter Randomizer</h2>
        <p>
          Build balanced combat encounters using party size, level and
          difficulty.
        </p>
      </header>

      <div className="encounter-layout">
        <Card className="quest-card encounter-form-card">
          <Card.Body>
            <div className="form-section-heading encounter-card-heading">
              <h3>Encounter Setup</h3>
              <p>Tune the party profile before generating a combat draft.</p>
            </div>

            <Form onSubmit={handleGenerateEncounter}>
              <Row className="g-4">
                <Col xs={12}>
                  <Form.Group
                    controlId="encounterPlayers"
                    className="config-control"
                  >
                    <Form.Label className="config-label">
                      Number of players
                    </Form.Label>
                    <Form.Control
                      className="quest-input encounter-input"
                      type="number"
                      min={1}
                      max={8}
                      value={players}
                      onChange={(event) => setPlayers(event.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group
                    controlId="encounterLevel"
                    className="config-control"
                  >
                    <Form.Label className="config-label">
                      Party level
                    </Form.Label>
                    <Form.Select
                      className="quest-input encounter-input"
                      value={level}
                      onChange={(event) => setLevel(Number(event.target.value))}
                    >
                      {levelOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group
                    controlId="encounterDifficulty"
                    className="config-control"
                  >
                    <Form.Label className="config-label">Difficulty</Form.Label>
                    <Form.Select
                      className="quest-input encounter-input"
                      value={difficulty}
                      onChange={(event) => setDifficulty(event.target.value)}
                    >
                      {difficultyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="warning"
                type="submit"
                className="fw-bold quest-button quest-button-wide encounter-submit"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Encounter"}
              </Button>

              {isLoading && (
                <p className="encounter-loading mb-0">
                  Generating encounter...
                </p>
              )}

              {error && (
                <Alert variant="danger" className="mt-4 mb-0">
                  {error}
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>

        {encounterResult && (
          <section className="encounter-results" aria-live="polite">
            <div className="encounter-monster-list">
              {monsters.length === 0 && (
                <Card className="quest-card encounter-monster-card">
                  <Card.Body>
                    <p className="mb-0 encounter-empty">
                      No monsters returned.
                    </p>
                  </Card.Body>
                </Card>
              )}

              {monsters.map((monster, index) => {
                const monsterKey = `${monster?.name || "monster"}-${index}`;
                const isExpanded = expandedMonsterKeys.includes(monsterKey);
                const abilityScores = [
                  ["STR", getAbilityScore(monster, "str", "strength")],
                  ["DEX", getAbilityScore(monster, "dex", "dexterity")],
                  ["CON", getAbilityScore(monster, "con", "constitution")],
                  ["INT", getAbilityScore(monster, "int", "intelligence")],
                  ["WIS", getAbilityScore(monster, "wis", "wisdom")],
                  ["CHA", getAbilityScore(monster, "cha", "charisma")],
                ];

                return (
                  <Card
                    className="quest-card encounter-monster-card"
                    key={monsterKey}
                  >
                    <Card.Body>
                      <div className="encounter-monster-header">
                        <div>
                          <h3>{formatValue(monster?.name)}</h3>
                          <p>
                            {formatValue(monster?.size)}{" "}
                            {formatValue(monster?.type)}
                          </p>
                        </div>
                        <span>x{formatValue(monster?.quantity)}</span>
                      </div>

                      <div className="encounter-monster-grid">
                        <div>
                          <span>Challenge rating</span>
                          <strong>
                            {formatValue(monster?.challengeRating)}
                          </strong>
                        </div>
                        <div>
                          <span>XP</span>
                          <strong>{formatValue(monster?.xp)}</strong>
                        </div>
                        <div>
                          <span>Size</span>
                          <strong>{formatValue(monster?.size)}</strong>
                        </div>
                        <div>
                          <span>Type</span>
                          <strong>{formatValue(monster?.type)}</strong>
                        </div>
                      </div>

                      <Button
                        variant="outline-primary"
                        type="button"
                        className="encounter-details-button"
                        onClick={() => toggleMonsterDetails(monsterKey)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Hide stat block" : "View stat block"}
                      </Button>

                      {isExpanded && (
                        <div className="encounter-stat-block">
                          <div className="encounter-monster-grid">
                            <div>
                              <span>Armor class</span>
                              <strong>
                                {formatValue(monster?.armorClass)}
                              </strong>
                            </div>
                            <div>
                              <span>Hit points</span>
                              <strong>{formatValue(monster?.hitPoints)}</strong>
                            </div>
                            <div>
                              <span>Hit dice</span>
                              <strong>
                                {formatValue(
                                  monster?.hitDice ?? monster?.hit_dice,
                                )}
                              </strong>
                            </div>
                            <div>
                              <span>Speed</span>
                              <strong>{formatSpeed(monster?.speed)}</strong>
                            </div>
                          </div>

                          <div className="encounter-ability-grid">
                            {abilityScores.map(([label, value]) => (
                              <div key={label}>
                                <span>{label}</span>
                                <strong>{formatValue(value)}</strong>
                              </div>
                            ))}
                          </div>

                          <div className="encounter-detail-list">
                            <div>
                              <span>Damage Resistances</span>
                              <strong>
                                {formatList(
                                  monster?.damageResistances ??
                                    monster?.damage_resistances,
                                )}
                              </strong>
                            </div>
                            <div>
                              <span>Damage Immunities</span>
                              <strong>
                                {formatList(
                                  monster?.damageImmunities ??
                                    monster?.damage_immunities,
                                )}
                              </strong>
                            </div>
                            <div>
                              <span>Condition Immunities</span>
                              <strong>
                                {formatList(
                                  monster?.conditionImmunities ??
                                    monster?.condition_immunities,
                                )}
                              </strong>
                            </div>
                            <div>
                              <span>Senses</span>
                              <strong>{formatList(monster?.senses)}</strong>
                            </div>
                            <div>
                              <span>Languages</span>
                              <strong>{formatList(monster?.languages)}</strong>
                            </div>
                            <div>
                              <span>Challenge Rating</span>
                              <strong>
                                {formatValue(monster?.challengeRating)}
                              </strong>
                            </div>
                            <div>
                              <span>XP</span>
                              <strong>{formatValue(monster?.xp)}</strong>
                            </div>
                          </div>

                          <div className="encounter-text-section">
                            <span>Special Abilities</span>
                            <p>
                              {formatTextBlocks(
                                monster?.specialAbilities ??
                                  monster?.special_abilities,
                              )}
                            </p>
                          </div>

                          <div className="encounter-text-section">
                            <span>Actions</span>
                            <p>{formatTextBlocks(monster?.actions)}</p>
                          </div>

                          <div className="encounter-text-section">
                            <span>Legendary Actions</span>
                            <p>
                              {formatTextBlocks(
                                monster?.legendaryActions ??
                                  monster?.legendary_actions,
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default EncounterRandomizer;
