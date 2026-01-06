import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ReplayIcon from "@mui/icons-material/Replay";

function CategorySelect({
  selectedCategory,
  handleCategoryChange,
  selectStyle,
  loadingCategories,
  categories,
  handleClearCategory,
  categoryError,
  catIsFetching,
  refetchCategories,
}) {
  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* <h3 className="assessment-title">Categorized Answers</h3> */}

        <FormControl fullWidth size="small">
          <InputLabel id="category-select-label">Select Category</InputLabel>

          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="" disabled>
              {catIsFetching ? "Loading categories..." : "Select a category"}
            </MenuItem>

            {categories?.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {categoryError && !catIsFetching ? (
          <IconButton onClick={refetchCategories}>
            <ReplayIcon />
          </IconButton>
        ) : (
          selectedCategory && (
            <IconButton onClick={handleClearCategory}>
              <ClearIcon />
            </IconButton>
          )
        )}
      </div>
    </div>
  );
}

export default CategorySelect;
