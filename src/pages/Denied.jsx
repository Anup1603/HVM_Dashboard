import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import "../Dash.css";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Denied({ deniedVisitors }) {
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const hospitalLocalStorage = JSON.parse(localStorage.getItem("hospital"));

  if (!hospitalLocalStorage) {
    navigate("/");
  }

  const handleRowClick = (visitor) => {
    setSelectedVisitor(visitor);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVisitor(null);
  };

  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex", backgroundColor: "#ECEFF1" }}>
        <SideNav />

        <Box component="main" sx={{ p: 3, mt: 8, flexGrow: 1 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="visitor table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Contact</TableCell>
                  <TableCell align="left">Visit Person</TableCell>
                  <TableCell align="left">Expected Duration</TableCell>
                  <TableCell align="left">Purpose</TableCell>
                  <TableCell align="left">Entry Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deniedVisitors.map((visitor, index) => (
                  <TableRow
                    key={visitor._id}
                    hover
                    onClick={() => handleRowClick(visitor)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{visitor.name}</TableCell>
                    <TableCell align="left">{visitor.contact}</TableCell>
                    <TableCell align="left">
                      {visitor.visitPersonOrDepartment}
                    </TableCell>
                    <TableCell align="left">
                      {visitor.expectedDuration}
                    </TableCell>
                    <TableCell align="left">{visitor.purpose}</TableCell>
                    <TableCell align="left">
                      {new Date(visitor.createdAt).toLocaleString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Modal for Full Visitor Details */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="visitor-details-title"
        aria-describedby="visitor-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedVisitor && (
            <>
              <Typography
                id="visitor-details-title"
                variant="h6"
                component="h2"
              >
                Visitor Details
              </Typography>
              <Typography id="visitor-details-description" sx={{ mt: 2 }}>
                <strong>Name:</strong> {selectedVisitor.name}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Email:</strong> {selectedVisitor.email}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Contact:</strong> {selectedVisitor.contact}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Purpose:</strong> {selectedVisitor.purpose}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Other Purpose:</strong> {selectedVisitor.otherPurpose}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Visit Person/Department:</strong>{" "}
                {selectedVisitor.visitPersonOrDepartment}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Expected Duration:</strong>{" "}
                {selectedVisitor.expectedDuration}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Government ID:</strong> {selectedVisitor.governmentId}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Last 4 Digit no.:</strong>{" "}
                {selectedVisitor.idLast4Digits}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Approved:</strong> {selectedVisitor.isApproved}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Entry Time:</strong>{" "}
                {new Date(selectedVisitor.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default Denied;
