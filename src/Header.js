import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const links = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "About", to: "/about" },
  { label: "Feedback", to: "/feedback" },
  { label: "Assessment", to: "/assessment" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const NavLinks = ({ onClick }) => (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        alignItems: { md: "center" },
      }}
    >
      {links.map((link) => (
        <Typography
          key={link.to}
          component={NavLink}
          to={link.to}
          onClick={onClick}
          end={link.to === "/"}
          sx={{
            textDecoration: "none",
            fontWeight: 500,
            // color: "text.tertiary",
            "&.active": {
              fontWeight: 700,
              textDecoration: "underline",
            },
          }}
        >
          {link.label}
        </Typography>
      ))}
    </Stack>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={
          {
            // color: "text.tertiary",
          }
        }
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            component={NavLink}
            to="/"
            variant="h6"
            fontWeight={700}
            sx={{
              textDecoration: "none",
              // color: "text.tertiary",
            }}
          >
            Breath Analysis
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <NavLinks />
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            onClick={toggleMenu}
            sx={{ display: { xs: "block", md: "none" }, color:"inherit" }}
          >
            {isMobileMenuOpen ? (
              <CloseIcon  />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </Toolbar>
        {/* <Alert severity="info">
          We are still working on some bugs as of {new Date().toDateString()}
        </Alert> */}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={toggleMenu}
        PaperProps={{
          sx: {
            width: 260,
            p: 3,
          },
        }}
      >
        <NavLinks onClick={toggleMenu} />
      </Drawer>
    </>
  );
}
