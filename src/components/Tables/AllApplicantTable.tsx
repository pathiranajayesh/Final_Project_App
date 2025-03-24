import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Avatar,
  Typography,
  Box,
  Badge,
} from "@mui/material";
import { DeleteSweep, EditNote,ReadMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ApplicantDataType } from "../../types/ApplicantType";
import axiosInstance from "../../auth/axiosInstance";

type Props = {
  tableData: ApplicantDataType[];
};

const AllApplicantTable = ({ tableData }: Props) => {

  const navigate = useNavigate();

  const handleClick = (applicantId: string) => {
    navigate(`/applicant/${applicantId}`);
  };

  const handleEditClick = (applicantId: string) => {
    navigate(`/applicant/edit/${applicantId}`);
  };


  const handleDeleteClick = async (applicantId: string) => {
    if (confirm("Are you sure you want to delete this applicant?")) {
      try {
        await axiosInstance.delete(`/api/Applicant/${applicantId}`);
        alert('Applicant deleted successfully');
        window.location.reload();
      } catch (err) {
       alert('Failed to delete applicant');
      }
    }
    
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2 }}>
      <Table>
        {/* Table Head */}
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            {/* <TableCell padding="checkbox">
              <Checkbox />
            </TableCell> */}

            <TableCell>NIC No.</TableCell>
            <TableCell>Passport No.</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          { tableData && tableData.map((applicant) => (
              <TableRow key={applicant.id} hover>
                <TableCell>{applicant.nicNumber}</TableCell>
                <TableCell sx={{ width:150}}>{applicant.passportNumber}</TableCell>
                <TableCell>
                  <Avatar src={applicant.image} alt={applicant.name} />
                </TableCell>
                <TableCell>
                  <Typography>{applicant.fullName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{applicant.phoneMobile}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{applicant.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{applicant.addressLine1},{applicant.addressLine2},{applicant.addressLine3}</Typography>
                </TableCell>
                <TableCell>
                  <Box >
                    {applicant.isActive ?
                      <Badge color="success" badgeContent={"Active"}> </Badge> :<Badge color="error" badgeContent={"Inactive"}> </Badge>
                    }
                  </Box>
                </TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <IconButton
                    onClick={() => handleClick(applicant.id)}
                    sx={{ 
                      px:1,
                      "&:hover": { backgroundColor: "default.dark" },
                    }}
                  >
                    <ReadMore />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEditClick(applicant.id)}
                    sx={{
                      px:1,
                      "&:hover": { backgroundColor: "rgb(189, 135, 113)", color: "white" },
                    }}
                  >
                    <EditNote />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(applicant.id)}
                    sx={{
                      px:1,
                      "&:hover": { backgroundColor: "error.dark", color: "white" },
                    }}
                  >
                    <DeleteSweep />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllApplicantTable;
