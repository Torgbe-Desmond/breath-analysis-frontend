import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Button, Typography } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <section className="box intro">
        <h1>BadBreath Analysis</h1>
        <p>
          This project analyzes real experiences of bad breath to identify
          patterns, symptoms, and possible causes beyond oral hygiene.
        </p>
      </section>

      {/* <section className="analytics">
        <div className="box analytics-item">
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            20 Reponses
          </Typography>
        </div>

      </section> */}

      <section className="action-buttons">
        <Button
          variant="outlined"
          onClick={() => navigate("/explore")}
          className=""
        >
          Explore Patterns
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/assessment")}
          className=""
        >
          Assess your status
        </Button>
      </section>
    </>
  );
}
