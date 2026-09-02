import React, { useEffect } from "react";

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

import { useService } from "../../Context/ServicesContext";
import { useSalon } from "../../Context/SalonContext";

// ======================================================
// STYLED TABLE CELL
// ======================================================

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// ======================================================
// STYLED TABLE ROW
// ======================================================

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// ======================================================
// SERVICE TABLE
// ======================================================

export default function ServiceTable() {
  // ====================================================
  // SERVICE CONTEXT
  // ====================================================

  const {
    services,
    loading: serviceLoading,
    error: serviceError,
    fetchServicesBySalon,
  } = useService();

  // ====================================================
  // SALON CONTEXT
  // ====================================================

  const {
    mySalon,
    salonId,
    mySalonLoading,
    mySalonError,
  } = useSalon();

  // ====================================================
  // DEBUG
  // ====================================================

  console.log("Owner salon:", mySalon);
  console.log("Owner salon ID:", salonId);

  // ====================================================
  // FETCH SERVICES
  // ====================================================

  useEffect(() => {
    // Wait until SalonContext finishes finding
    // the logged-in owner's salon.
    if (mySalonLoading) {
      return;
    }

    // If there is an error finding the salon
    if (mySalonError) {
      console.error(
        "Could not find owner's salon:",
        mySalonError
      );
      return;
    }

    // No salon yet
    if (!salonId) {
      console.warn(
        "No salon ID available for logged-in owner."
      );
      return;
    }

    // Salon exists.
    //
    // For Pagal:
    //
    // user.id = 5
    // salonId = 3
    //
    // Therefore:
    //
    // GET /api/service-offering/salon/3
    //

    console.log(
      "Fetching services for salon ID:",
      salonId
    );

    fetchServicesBySalon(salonId);
  }, [
    salonId,
    mySalonLoading,
    mySalonError,
    fetchServicesBySalon,
  ]);

  // ====================================================
  // SALON LOADING
  // ====================================================

  if (mySalonLoading) {
    return (
      <div className="p-4">
        <p>Loading salon information...</p>
      </div>
    );
  }

  // ====================================================
  // SALON ERROR
  // ====================================================

  if (mySalonError) {
    return (
      <div className="p-4">
        <p className="text-red-500">
          Failed to load your salon.
        </p>

        <p className="text-gray-500 mt-2">
          Please try again later.
        </p>
      </div>
    );
  }

  // ====================================================
  // NO SALON
  // ====================================================

  if (!salonId) {
    return (
      <div className="p-4">
        <p className="text-red-500">
          No salon found for this account.
        </p>

        <p className="text-gray-500 mt-2">
          Please make sure your salon is created
          and connected to your account.
        </p>
      </div>
    );
  }

  // ====================================================
  // SERVICES LOADING
  // ====================================================

  if (serviceLoading) {
    return (
      <div className="p-4">
        <p>Loading services...</p>
      </div>
    );
  }

  // ====================================================
  // SERVICE ERROR
  // ====================================================

  if (serviceError) {
    return (
      <div className="p-4">
        <p className="text-red-500">
          Failed to load services.
        </p>

        <p className="text-gray-500 mt-2">
          Please try again later.
        </p>
      </div>
    );
  }

  // ====================================================
  // UI
  // ====================================================

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-5">
        <h1 className="font-bold text-xl">
          Services
        </h1>
      </div>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700 }}
          aria-label="services table"
        >
          {/* ==================================================
              TABLE HEADER
          ================================================== */}

          <TableHead>
            <TableRow>
              <StyledTableCell>
                Image
              </StyledTableCell>

              <StyledTableCell>
                Name
              </StyledTableCell>

              <StyledTableCell>
                Description
              </StyledTableCell>

              <StyledTableCell align="right">
                Time
              </StyledTableCell>

              <StyledTableCell align="right">
                Price
              </StyledTableCell>

              <StyledTableCell align="right">
                Available
              </StyledTableCell>
            </TableRow>
          </TableHead>

          {/* ==================================================
              TABLE BODY
          ================================================== */}

          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                >
                  No services found for this salon.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <StyledTableRow
                  key={service.id}
                >
                  {/* IMAGE */}

                  <StyledTableCell>
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={
                          service.name ||
                          "Service"
                        }
                        className="w-20 h-20 object-cover rounded-md"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">
                        No image
                      </span>
                    )}
                  </StyledTableCell>

                  {/* NAME */}

                  <StyledTableCell>
                    {service.name || "-"}
                  </StyledTableCell>

                  {/* DESCRIPTION */}

                  <StyledTableCell>
                    {service.description || "-"}
                  </StyledTableCell>

                  {/* DURATION */}

                  <StyledTableCell align="right">
                    {service.duration !==
                    undefined &&
                    service.duration !== null
                      ? `${service.duration} min`
                      : "-"}
                  </StyledTableCell>

                  {/* PRICE */}

                  <StyledTableCell align="right">
                    {service.price !==
                      undefined &&
                    service.price !== null
                      ? `₹${service.price}`
                      : "-"}
                  </StyledTableCell>

                  {/* AVAILABLE */}

                  <StyledTableCell align="right">
                    {service.available
                      ? "Yes"
                      : "No"}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}