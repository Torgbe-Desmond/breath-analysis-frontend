import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  Chip,
  Divider,
} from "@mui/material";

const timeUnits = ["days", "weeks", "months", "years"];

export default function SuccessStoryForm() {
  const [form, setForm] = React.useState({
    headline: "",
    durationOfCondition: { value: "", unit: "years" },
    symptoms: [],
    severityIndicator: "",
    pastAttempts: [],
    chosenExplanation: "",
    interventionType: "",
    productsUsed: [],
    dosagePattern: "",
    dietChanges: "",
    timeToFirstResults: { value: "", unit: "weeks" },
    currentDuration: { value: "", unit: "weeks" },
    outcome: "",
    maintenanceActions: [],
    foodTriggerChange: "",
    theoryExtension: "",
    externalValidation: "",
    credibilitySignal: "",
    engagementOffer: { enabled: false, message: "" },
    proofLinks: [],
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field, key, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [key]: value },
    }));
  };

  const handleArrayAdd = (field, value) => {
    if (!value) return;
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], value],
    }));
  };

  const handleArrayDelete = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMITTED STORY:", form);
    alert("Check console for submitted data");
  };

  const ArrayInput = ({ label, field }) => {
    const [input, setInput] = React.useState("");
    return (
      <>
        <TextField
          label={label}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleArrayAdd(field, input);
              setInput("");
            }
          }}
          fullWidth
        />
        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {form[field].map((item, i) => (
            <Chip
              key={i}
              label={item}
              onDelete={() => handleArrayDelete(field, i)}
            />
          ))}
        </Stack>
      </>
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 900, mx: "auto", p: 3 }}
    >
      <Typography variant="h4" gutterBottom>
        Add Success Story
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Headline */}
      <TextField
        label="Headline"
        fullWidth
        required
        value={form.headline}
        onChange={(e) => handleChange("headline", e.target.value)}
      />

      {/* Duration */}
      <Stack direction="row" spacing={2} mt={2}>
        <TextField
          label="Duration Value"
          type="number"
          required
          value={form.durationOfCondition.value}
          onChange={(e) =>
            handleNestedChange("durationOfCondition", "value", e.target.value)
          }
        />
        <TextField
          select
          label="Duration Unit"
          value={form.durationOfCondition.unit}
          onChange={(e) =>
            handleNestedChange("durationOfCondition", "unit", e.target.value)
          }
        >
          {timeUnits.map((u) => (
            <MenuItem key={u} value={u}>
              {u}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Symptoms */}
      <ArrayInput label="Add Symptom (press Enter)" field="symptoms" />

      {/* Severity */}
      <TextField
        label="Severity Indicator"
        fullWidth
        multiline
        sx={{ mt: 2 }}
        value={form.severityIndicator}
        onChange={(e) => handleChange("severityIndicator", e.target.value)}
      />

      <Divider sx={{ my: 2 }} />

      {/* Past Attempts */}
      <ArrayInput label="What Didn't Work (press Enter)" field="pastAttempts" />

      <Divider sx={{ my: 2 }} />

      {/* Turning Point */}
      <TextField
        label="Chosen Explanation"
        fullWidth
        sx={{ mt: 2 }}
        value={form.chosenExplanation}
        onChange={(e) => handleChange("chosenExplanation", e.target.value)}
      />

      <TextField
        label="Intervention Type"
        fullWidth
        sx={{ mt: 2 }}
        value={form.interventionType}
        onChange={(e) => handleChange("interventionType", e.target.value)}
      />

      <Divider sx={{ my: 2 }} />

      {/* Method */}
      <ArrayInput label="Products Used (press Enter)" field="productsUsed" />

      <TextField
        label="Dosage Pattern"
        fullWidth
        multiline
        sx={{ mt: 2 }}
        value={form.dosagePattern}
        onChange={(e) => handleChange("dosagePattern", e.target.value)}
      />

      <TextField
        label="Diet Changes"
        fullWidth
        multiline
        sx={{ mt: 2 }}
        value={form.dietChanges}
        onChange={(e) => handleChange("dietChanges", e.target.value)}
      />

      <Divider sx={{ my: 2 }} />

      {/* Results */}
      <Stack direction="row" spacing={2}>
        <TextField
          label="Time to First Results"
          type="number"
          value={form.timeToFirstResults.value}
          onChange={(e) =>
            handleNestedChange("timeToFirstResults", "value", e.target.value)
          }
        />
        <TextField
          select
          label="Unit"
          value={form.timeToFirstResults.unit}
          onChange={(e) =>
            handleNestedChange("timeToFirstResults", "unit", e.target.value)
          }
        >
          {timeUnits.map((u) => (
            <MenuItem key={u} value={u}>
              {u}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction="row" spacing={2} mt={2}>
        <TextField
          label="Current Duration"
          type="number"
          value={form.currentDuration.value}
          onChange={(e) =>
            handleNestedChange("currentDuration", "value", e.target.value)
          }
        />
        <TextField
          select
          label="Unit"
          value={form.currentDuration.unit}
          onChange={(e) =>
            handleNestedChange("currentDuration", "unit", e.target.value)
          }
        >
          {timeUnits.map((u) => (
            <MenuItem key={u} value={u}>
              {u}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <TextField
        label="Outcome"
        fullWidth
        multiline
        sx={{ mt: 2 }}
        value={form.outcome}
        onChange={(e) => handleChange("outcome", e.target.value)}
      />

      <Divider sx={{ my: 2 }} />

      {/* Maintenance */}
      <ArrayInput
        label="Maintenance Actions (press Enter)"
        field="maintenanceActions"
      />

      <TextField
        label="Food Trigger Change"
        fullWidth
        sx={{ mt: 2 }}
        value={form.foodTriggerChange}
        onChange={(e) => handleChange("foodTriggerChange", e.target.value)}
      />

      <Divider sx={{ my: 2 }} />

      {/* Reflection */}
      <TextField
        label="Theory / Insight"
        fullWidth
        multiline
        sx={{ mt: 2 }}
        value={form.theoryExtension}
        onChange={(e) => handleChange("theoryExtension", e.target.value)}
      />

      <TextField
        label="External Validation"
        fullWidth
        sx={{ mt: 2 }}
        value={form.externalValidation}
        onChange={(e) => handleChange("externalValidation", e.target.value)}
      />

      <TextField
        label="Credibility Signal"
        fullWidth
        sx={{ mt: 2 }}
        value={form.credibilitySignal}
        onChange={(e) => handleChange("credibilitySignal", e.target.value)}
      />

      <ArrayInput label="Proof Links (press Enter)" field="proofLinks" />

      <Divider sx={{ my: 3 }} />

      <Button type="submit" variant="contained" size="large">
        Submit Story
      </Button>
    </Box>
  );
}
