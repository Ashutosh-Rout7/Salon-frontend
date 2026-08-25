import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const dummyBookings = [
  {
    id: 101,
    startTime: "2026-08-01T10:30:00",
    totalPrice: 500,
    customer: {
      fullName: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
    },
  },
  {
    id: 102,
    startTime: "2026-08-02T14:00:00",
    totalPrice: 750,
    customer: {
      fullName: "Jane Smith",
      email: "jane@example.com",
      mobile: "9123456780",
    },
  },
];

export default function TransactionTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Customer Details</TableCell>
            <TableCell>Booking</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyBookings.map((item) => (
            <TableRow key={item.id}>
              <TableCell align="left">
                <div className="space-y-1">
                  <h1 className="font-medium">
                    {item.startTime.split("T")[0]}
                  </h1>
                </div>
              </TableCell>
              <TableCell component="th" scope="row">
                <div className="space-y-2">
                  <h1>{item.customer.fullName}</h1>
                  <h1 className="font-semibold">{item.customer.email}</h1>
                  <h1 className="font-bold text-gray-600">
                    {item.customer.mobile}
                  </h1>
                </div>
              </TableCell>
              <TableCell>
                Booking Id : <strong> {item.id} </strong>
              </TableCell>
              <TableCell align="right">₹{item.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}