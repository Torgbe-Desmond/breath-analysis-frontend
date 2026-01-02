import { IconButton } from "@mui/material";
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
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={selectStyle}
        >
          <option value="">
            {catIsFetching ? "Loading categories..." : "Select a category"}
          </option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {categoryError && !catIsFetching ? (
          <IconButton onClick={refetchCategories}>
            <ReplayIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleClearCategory}>
            <ClearIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default CategorySelect;
