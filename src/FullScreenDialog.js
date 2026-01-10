import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import React, { forwardRef } from "react";
import SingleResponse from "./pages/SingleResponse";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Height } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog({ open, onClose, responseId, response }) {
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative", position: "sticky" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ ml: 2 }} variant="h6" component="div">
              Response {response}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ Height: "100vh", overflow: "auto" }}>
          <SingleResponse responseId={responseId} />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

export default FullScreenDialog;
