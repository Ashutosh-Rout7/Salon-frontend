import React from "react";
import {
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

const CategoryForm = () => {
  return (
    <div className="flex justify-center items-center">
      <form className="space-y-4 p-4 w-full lg:w-1/2">
        <Grid container spacing={2}>
          {/* Image upload placeholder (static) */}
          <Grid className="w-24 h-24" size={{ xs: 12 }}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
            />
            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>
            </label>

            {/* Static preview example - remove if not needed */}
            {/*
            <div className="relative border">
              <img
                className="w-24 h-24 object-cover"
                src="/placeholder.jpg"
                alt="Category"
              />
              <IconButton
                size="small"
                color="error"
                sx={{ position: "absolute", top: 0, right: 0, outline: "none" }}
              >
                <CloseIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </div>
            */}
          </Grid>

          {/* Name field */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <TextField fullWidth id="name" name="name" label="name" required />
          </Grid>

          {/* Submit button */}
          <Grid size={12}>
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              sx={{ py: ".8rem" }}
            >
              create category
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CategoryForm;