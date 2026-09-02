import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {
  tableCellClasses,
} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { useCategory } from "../../Context/CategoryContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CategoryTable() {
  const {
    categories,
    loading,
    error,
  } = useCategory();

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <CircularProgress />
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================
  if (error) {
    return (
      <div className="py-10 text-center">
        <Typography color="error">
          {error}
        </Typography>
      </div>
    );
  }

  // ===============================
  // NO DATA
  // ===============================
  if (!categories || categories.length === 0) {
    return (
      <div className="py-20 text-center">
        <Typography variant="h6">
          No categories found
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Create your first category.
        </Typography>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="categories table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>
              Image
            </StyledTableCell>

            <StyledTableCell>
              Name
            </StyledTableCell>

            <StyledTableCell>
              Salon ID
            </StyledTableCell>

            <StyledTableCell>
              Category ID
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <StyledTableRow key={category.id}>
              {/* IMAGE */}
              <StyledTableCell>
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md">
                    No Image
                  </div>
                )}
              </StyledTableCell>

              {/* NAME */}
              <StyledTableCell>
                {category.name}
              </StyledTableCell>

              {/* SALON ID */}
              <StyledTableCell>
                {category.salonId}
              </StyledTableCell>

              {/* ID */}
              <StyledTableCell>
                {category.id}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}