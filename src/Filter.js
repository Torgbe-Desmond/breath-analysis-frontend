import {
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Filter.css";

export default function Filter({
  filterType,
  setFilterType,
  search,
  setSearch,
  onAddQuestion,
  setAddModalOpen,
}) {
  return (
    <Box
      className="question-filters"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        gap: "1rem",
        mb: 3,
        maxWidth: "100%",
        flexDirection: "row",
      }}
    >
      {/* TYPE FILTER */}

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        required
      >
        <option value="">Select field type</option>
        <option value="text">Text</option>
        <option value="textarea">Textarea</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
        <option value="dropdown">Dropdown</option>
      </select>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ADD BUTTON */}
      <IconButton
        variant="contained"
        onClick={() => {
          setAddModalOpen(true);
        }}
        sx={{ ml: "auto" }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}
