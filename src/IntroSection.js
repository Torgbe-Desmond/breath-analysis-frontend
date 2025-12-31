import { Link } from "react-router-dom"; // if using react-router
import "./IntroSection.css";
const IntroSection = ({ stats }) => {
  return (
    <>
      {/* INTRO */}
      <section className="box intro">
        <h1>BadBreath Analysis</h1>
        <p>
          This project analyzes real experiences of bad breath to identify
          patterns, symptoms, and possible causes beyond oral hygiene.
        </p>
      </section>

      {/* CTA BOX */}
      <section className="box cta">
        <Link to="/explore" className="btn secondary">
          Explore Patterns
        </Link>
        <Link to="/contribute" className="btn secondary">
          Submit Your Data
        </Link>
        <Link to="/assess" className="btn secondary">
          Assess your status
        </Link>
      </section>

      {/* STATS SNAPSHOT */}
      <section className="box stats">
        <div className="stat">
          <h3>Total responses</h3>
          <p>{stats?.totalResponses}</p>
        </div>

        <div className="stat">
          <h3>Most common smell</h3>
          <p>{stats?.commonSmell}</p>
        </div>

        <div className="stat">
          <h3>Most common trigger</h3>
          <p>{stats?.commonTrigger}</p>
        </div>
      </section>
    </>
  );
};

export default IntroSection;
