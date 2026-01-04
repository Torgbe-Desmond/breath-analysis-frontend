import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function JsonPreviewModal({ open, onClose, jsonData }) {
  const formattedJson = React.useMemo(
    () => JSON.stringify(jsonData, null, 2),
    [jsonData]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formattedJson);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" >
      <DialogTitle>JSON Preview</DialogTitle>

      <DialogContent dividers>
        <Box
          component="pre"
          sx={{
            backgroundColor: "#0f172a",
            color: "#e5e7eb",
            p: 2,
            borderRadius: 1,
            maxHeight: 400,
            width: { xs: 350, sm: 500 },
            overflow: "auto",
            fontSize: "0.85rem",
          }}
        >
          {formattedJson}
        </Box>
      </DialogContent>

      <DialogActions>
        <Tooltip title="Copy JSON">
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>

        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
