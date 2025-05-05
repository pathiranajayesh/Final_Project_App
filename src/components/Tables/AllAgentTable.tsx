import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  // Avatar,
  Typography,
  Box,
  Badge,
} from "@mui/material";
import { DeleteSweep, EditNote,ReadMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import { AgentDataType } from "../../types/AgentType";

type Props = {
  tableData: AgentDataType[];
};

const AllAgentTable = ({ tableData }: Props) => {

  const navigate = useNavigate();

  const handleClick = (agentId: string) => {
    navigate(`/agent/${agentId}`);
  };

  const handleEditClick = (agentId: string) => {
    navigate(`/agent/edit/${agentId}`);
  };


  const handleDeleteClick = async (agentId: string) => {
    if (confirm("Are you sure you want to delete this agent?")) {
      try {
        await axiosInstance.delete(`/api/Agent/${agentId}`);
        alert('Agent deleted successfully');
        window.location.reload();
      } catch (err) {
       alert('Failed to delete agent');
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

            <TableCell>Agent Code</TableCell>
            {/* <TableCell>Passport No.</TableCell>
            <TableCell>Photo</TableCell> */}
            <TableCell>Full Name</TableCell>
            {/* <TableCell>Phone</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell> */}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          { tableData && tableData.map((agent) => (
              <TableRow key={agent.id} hover>
                <TableCell>{agent.nicNumber}</TableCell>
                {/* <TableCell sx={{ width:150}}>{applicant.passportNumber}</TableCell>
                <TableCell>
                  <Avatar src={applicant.image} alt={applicant.name} />
                </TableCell> */}
                <TableCell>
                  <Typography>{agent.fullName}</Typography>
                </TableCell>
                <TableCell>
                  {/* <Typography>{agent.phoneMobile}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{applicant.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{applicant.addressLine1},{applicant.addressLine2},{applicant.addressLine3}</Typography>
                </TableCell>
                <TableCell> */}
                  <Box >
                    {agent.isActive ?
                      <Badge color="success" badgeContent={"Active"}> </Badge> :<Badge color="error" badgeContent={"Inactive"}> </Badge>
                    }
                  </Box>
                </TableCell>
                <TableCell sx={{ display: "flex" }}>
                  <IconButton
                    onClick={() => handleClick(agent.id)}
                    sx={{ 
                      px:1,
                      "&:hover": { backgroundColor: "default.dark" },
                    }}
                  >
                    <ReadMore />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEditClick(agent.id)}
                    sx={{
                      px:1,
                      "&:hover": { backgroundColor: "rgb(189, 135, 113)", color: "white" },
                    }}
                  >
                    <EditNote />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(agent.id)}
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

export default AllAgentTable;
