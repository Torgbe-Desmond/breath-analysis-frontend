import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import UpdateIcon from "@mui/icons-material/Update";

export default function Home() {
  const navigate = useNavigate();

  const stats = {
    responses: 1247,
    categories: 9,
    lastUpdated: "January 2026",
  };
  return (
    <>
      <Paper className="box intro" bgColor="inherit">
        <Typography variant="h1" fontWeight={600}>
          BadBreath Analysis
        </Typography>
        <Typography variant="body1">
          This project analyzes real experiences of bad breath to identify
          patterns, symptoms, and possible causes beyond oral hygiene.
        </Typography>
      </Paper>
{/* 
      <Divider sx={{ mb: 3 }} />
      {
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                {stats.responses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Responses analyzed
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                {stats.categories}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Symptom categories
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                {stats.lastUpdated}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last dataset update
              </Typography>
            </Box>
          </Grid>
        </Grid>
      }
      <Divider sx={{ mb: 3, mt: 3 }} /> */}

      <section className="action-buttons">
        <Button
          // className="btn"
          variant="contained"
          onClick={() => navigate("/explore")}
        >
          Explore Patterns
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/assessment")}
          // className="btn"
        >
          Assess your status
        </Button>
      </section>
    </>
  );
}
