import React from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

const ServiceForm = () => {
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
                alt="Service"
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

          {/* Description field */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="description"
              name="description"
              label="Description"
              required
            />
          </Grid>

          {/* Price field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              required
            />
          </Grid>

          {/* Duration field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="duration"
              name="duration"
              label="Duration"
              type="number"
              required
            />
          </Grid>

          {/* Category dropdown (static options) */}
          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                label="Category"
                name="category"
                defaultValue=""
              >
                <MenuItem value="haircut">Haircut</MenuItem>
                <MenuItem value="spa">Spa</MenuItem>
                <MenuItem value="massage">Massage</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Submit button */}
          <Grid size={12}>
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              sx={{ py: ".8rem" }}
            >
              Add New Service
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ServiceForm;