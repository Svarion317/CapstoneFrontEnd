import dragonImage from "../src/assets/dragon.jpeg";

function Hero() {
  return (
    <section
      className="hero-section text-white"
      style={{
        backgroundImage: `url(${dragonImage})`,
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container hero-content">
        <div className="row align-items-center min-vh-50">
          <div className="col-lg-7">
            <div className="hero-copy-box">
              <span className="hero-eyebrow">Dark Fantasy Quest Design</span>
              <h1 className="hero-title">Forge Your Next Quest</h1>
              <p className="hero-subtitle mb-0">
                Build adventures, shape encounters, and guide every session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
