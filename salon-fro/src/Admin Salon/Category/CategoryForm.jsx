import React, { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import { useCategory } from "../../Context/CategoryContext";

const CategoryForm = () => {
  const { addCategory } = useCategory();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  // ==================================
  // IMAGE CHANGE
  // ==================================
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  // ==================================
  // REMOVE IMAGE
  // ==================================
  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");
  };

  // ==================================
  // SUBMIT
  // ==================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       *
       * This assumes your backend accepts:
       *
       * {
       *    "name": "Hair Styling",
       *    "image": "..."
       * }
       *
       * If your backend expects MultipartFile,
       * see the note below.
       */

      const categoryData = {
        name: name.trim(),

        // Only send image if you have one.
        // This currently sends the local preview URL.
        image: preview || "",
      };

      console.log("Sending category:", categoryData);

      await addCategory(categoryData);

      setMessage("Category created successfully.");

      // Reset form
      setName("");
      setImage(null);
      setPreview("");

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to create category."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 w-full lg:w-1/2"
      >
        <Grid container spacing={2}>

          {/* ========================= */}
          {/* IMAGE */}
          {/* ========================= */}
          <Grid size={{ xs: 12 }}>

            {!preview ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <label htmlFor="fileInput">
                  <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                    <AddPhotoAlternateIcon className="text-gray-700" />
                  </span>
                </label>
              </>
            ) : (
              <div className="relative w-24 h-24">

                <img
                  src={preview}
                  alt="Category preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />

                <Button
                  onClick={handleRemoveImage}
                  size="small"
                  sx={{
                    minWidth: 0,
                    position: "absolute",
                    top: -10,
                    right: -10,
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    padding: 0,
                  }}
                >
                  <CloseIcon fontSize="small" />
                </Button>

              </div>
            )}
          </Grid>

          {/* ========================= */}
          {/* NAME */}
          {/* ========================= */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>

          {/* ========================= */}
          {/* ERROR */}
          {/* ========================= */}
          {error && (
            <Grid size={{ xs: 12 }}>
              <Typography color="error">
                {error}
              </Typography>
            </Grid>
          )}

          {/* ========================= */}
          {/* SUCCESS */}
          {/* ========================= */}
          {message && (
            <Grid size={{ xs: 12 }}>
              <Typography color="success.main">
                {message}
              </Typography>
            </Grid>
          )}

          {/* ========================= */}
          {/* SUBMIT */}
          {/* ========================= */}
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: ".8rem",
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                />
              ) : (
                "CREATE CATEGORY"
              )}
            </Button>
          </Grid>

        </Grid>
      </form>
    </div>
  );
};

export default CategoryForm;