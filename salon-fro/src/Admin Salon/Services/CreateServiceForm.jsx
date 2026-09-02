import React, { useState } from "react";

import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { useService } from "../../Context/ServicesContext";
import { useCategory } from "../../Context/CategoryContext";

const CreateServiceForm = () => {
  const { addService } = useService();

  const {
    categories,
    loading: categoryLoading,
  } = useCategory();

  // ======================================================
  // FORM STATE
  // ======================================================

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.duration ||
      !formData.category
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      // ==================================================
      // IMPORTANT
      // ==================================================
      // NO salonId HERE.
      //
      // Backend gets salon owner from JWT token.
      // ==================================================

      const serviceData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        duration: Number(formData.duration),
        image: formData.image.trim(),
        category: Number(formData.category),
      };

      console.log("Sending service data:", serviceData);

      const result = await addService(serviceData);

      console.log("Service created:", result);

      alert("Service created successfully!");

      // Clear form
      setFormData({
        name: "",
        description: "",
        price: "",
        duration: "",
        image: "",
        category: "",
      });
    } catch (error) {
      console.error("Create service failed:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create service"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 w-full lg:w-1/2"
      >
        <Grid container spacing={2}>

          {/* ==========================================
              IMAGE URL
          ========================================== */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="image"
              label="Image URL"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </Grid>

          {/* IMAGE ICON */}

          <Grid size={{ xs: 12 }}>
            <div className="w-24 h-24 flex items-center justify-center p-3 border rounded-md border-gray-400">
              <AddPhotoAlternateIcon className="text-gray-700" />
            </div>
          </Grid>

          {/* ==========================================
              SERVICE NAME
          ========================================== */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Service Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* ==========================================
              DESCRIPTION
          ========================================== */}

          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* ==========================================
              PRICE
          ========================================== */}

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              inputProps={{
                min: 0,
              }}
              required
            />
          </Grid>

          {/* ==========================================
              DURATION
          ========================================== */}

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              name="duration"
              label="Duration (minutes)"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              inputProps={{
                min: 1,
              }}
              required
            />
          </Grid>

          {/* ==========================================
              CATEGORY
          ========================================== */}

          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth required>
              <InputLabel id="category-label">
                Category
              </InputLabel>

              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange}
              >
                {categoryLoading ? (
                  <MenuItem disabled>
                    Loading categories...
                  </MenuItem>
                ) : categories.length === 0 ? (
                  <MenuItem disabled>
                    No categories available
                  </MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* ==========================================
              SUBMIT
          ========================================== */}

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || categoryLoading}
              sx={{
                py: ".8rem",
              }}
            >
              {loading
                ? "Creating..."
                : "Add New Service"}
            </Button>
          </Grid>

        </Grid>
      </form>
    </div>
  );
};

export default CreateServiceForm;