import { Paper, Typography } from "@mui/material";
import "../App.css";
export default function About() {
  return (
    <Paper gap={1} className="box">
      <Typography variant="h1" fontWeight={600}>
        About This Project
      </Typography>
      <Typography>
        Bad breath, also known as halitosis, is a common but often misunderstood
        condition. While it’s frequently treated as a simple hygiene issue,
        persistent bad breath can be influenced by a range of factors including
        oral health, diet, hydration, lifestyle habits, and underlying medical
        conditions.
      </Typography>
      <Typography>
        Bad Breath Analysis was created to help bring clarity to this problem
        through structured data, honest self-reporting, and meaningful insights.
      </Typography>
      <Typography>Our goal is not to diagnose, but to identify patterns.</Typography>
    </Paper>
  );
}
