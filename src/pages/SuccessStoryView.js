import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  Link,
  Alert,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

// ---- Dummy API Response ----
const successStory = {
  headline: "Success!! / Success Story",

  durationOfCondition: { value: 15, unit: "years" },

  symptoms: [
    "White, dry tongue",
    "Tonsil stones",
    "Acid reflux",
    "Post nasal drip",
    "Fecal breath (mouth and nose)",
  ],

  severityIndicator: "Fecal breath noticeable from both mouth and nose",

  pastAttempts: [
    "Mouthwash",
    "Diet changes",
    "Tongue scraping",
    "Dental cleaning",
    "Doctors",
  ],

  chosenExplanation: "Candida and parasite overgrowth",
  interventionType: "Detox",

  productsUsed: [
    "Oregano oil",
    "NAC",
    "Olive leaf extract",
    "Antifungal herbal supplement",
  ],

  dosagePattern:
    "Twice daily — once on an empty stomach in the morning and once at night. Rotated antifungal herbs.",

  dietChanges:
    "Did not fully cut sugar, dairy, or carbs to keep it sustainable.",

  timeToFirstResults: { value: 2, unit: "weeks" },
  currentDuration: { value: 4, unit: "weeks" },

  outcome:
    "Breath is basically fresh with no fecal smell. Tongue is mostly clear.",

  maintenanceActions: [
    "Daily water flosser for tonsils",
    "Tongue cleaning as needed",
  ],

  foodTriggerChange:
    "Dairy and sugar no longer make breath significantly worse.",

  theoryExtension:
    "Carnivore diets may work by starving candida overgrowth rather than directly fixing breath.",

  externalValidation: "Candida subreddit",

  credibilitySignal: "Throwaway account",

  engagementOffer: {
    enabled: true,
    message: "Happy to answer questions for the next few hours.",
  },

  proofLinks: ["https://iherb.co/9U4yDxZq", "https://iherb.co/TxsRugxy"],
};

// ---- Component ----
export default function SuccessStoryView() {
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      <Card elevation={3}>
        <CardContent>
          {/* Header */}
          <Typography variant="h4" gutterBottom>
            {successStory.headline}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              label={`Duration: ${successStory.durationOfCondition.value} ${successStory.durationOfCondition.unit}`}
            />
            <Chip label={successStory.interventionType} color="primary" />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Problem */}
          <Typography variant="h6"> The Problem</Typography>
          <List dense>
            {successStory.symptoms.map((symptom, i) => (
              <ListItem key={i}>
                <ListItemText primary={symptom} />
              </ListItem>
            ))}
          </List>

          {successStory.severityIndicator && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {successStory.severityIndicator}
            </Alert>
          )}

          {/* Failed Attempts */}
          <Typography variant="h6">What Didn’t Work</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            {successStory.pastAttempts.map((attempt, i) => (
              <Chip key={i} label={attempt} variant="outlined" />
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Turning Point */}
          <Typography variant="h6"> The Turning Point</Typography>
          <Typography>
            <strong>Cause:</strong> {successStory.chosenExplanation}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Method */}
          <Typography variant="h6"> What I Actually Did</Typography>

          <Typography variant="subtitle2">Products Used</Typography>
          <List dense>
            {successStory.productsUsed.map((product, i) => (
              <ListItem key={i}>
                <ListItemText primary={product} />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle2">Dosage</Typography>
          <Typography paragraph>{successStory.dosagePattern}</Typography>

          <Typography variant="subtitle2">Diet Approach</Typography>
          <Typography paragraph>{successStory.dietChanges}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Results */}
          <Typography variant="h6"> Results Timeline</Typography>
          <Typography>
            <strong>Time to first results:</strong>{" "}
            {successStory.timeToFirstResults.value}{" "}
            {successStory.timeToFirstResults.unit}
          </Typography>
          <Typography>
            <strong>Current duration:</strong>{" "}
            {successStory.currentDuration.value}{" "}
            {successStory.currentDuration.unit}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Outcome */}
          <Typography variant="h6"> Current Outcome</Typography>
          <Typography paragraph>{successStory.outcome}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Maintenance */}
          <Typography variant="h6"> Maintenance</Typography>
          <List dense>
            {successStory.maintenanceActions.map((action, i) => (
              <ListItem key={i}>
                <ListItemText primary={action} />
              </ListItem>
            ))}
          </List>

          <Typography variant="subtitle2">Food Triggers</Typography>
          <Typography paragraph>{successStory.foodTriggerChange}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* Insight */}
          <Typography variant="h6"> Insight</Typography>
          <Typography paragraph>{successStory.theoryExtension}</Typography>

          {/* Credibility */}
          <Alert severity="info" sx={{ my: 2 }}>
            Credibility note: {successStory.credibilitySignal}
          </Alert>

          {/* Engagement */}
          {successStory.engagementOffer.enabled && (
            <Alert severity="success">
              {successStory.engagementOffer.message}
            </Alert>
          )}

          {/* Links */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            References
          </Typography>
          <List dense>
            {successStory.proofLinks.map((link, i) => (
              <ListItem key={i}>
                <Link href={link} target="_blank" rel="noopener">
                  {link}
                </Link>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
