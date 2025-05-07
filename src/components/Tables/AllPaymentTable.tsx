import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    IconButton,
    Badge,
  } from "@mui/material";
  import { OpenInNew, ReadMore } from "@mui/icons-material";
  import { useNavigate } from "react-router-dom";
  import { PaymentDataType } from "../../types/PaymentType";
import { PaymentMethodEnum } from "../../types/PaymentMethodEnum";
  
  type Props = {
    tableData: PaymentDataType[];
  };
  
  const AllPaymentTable = ({ tableData }: Props) => {
    const navigate = useNavigate();
  
    const handleClick = (paymentId: string) => {
      navigate(`/payments/${paymentId}`);
    };
  
    return (
      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2 }}>
        <Table>
          {/* Table Head */}
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Applicant ID</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
  
          {/* Table Body */}
          <TableBody>
            {tableData &&
              tableData.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell><a href={`/applicant/${payment.applicantId}`}>{payment.applicantId} <OpenInNew  /></a>  </TableCell> 
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.paymentDate}</TableCell>
                  <TableCell>
                    {(() => {
                      switch (payment.status) {
                        case 'Completed': 
                          return <Badge color="success" badgeContent={"Completed"}> </Badge>;
                        case 'Pending': 
                          return <Badge color="warning" badgeContent={"Pending"}> </Badge>;
                        case 'Failed': 
                          return <Badge color="error" badgeContent={"Failed"}> </Badge>;
                        default: 
                          return <Badge color="default" badgeContent={"Unknown"}> </Badge>; 
                      }
                    })()}
                  </TableCell>
                  <TableCell sx={{ display: "flex" }}>
                    <IconButton
                      onClick={() => handleClick(payment.id)}
                      sx={{
                        px: 1,
                        "&:hover": { backgroundColor: "default.dark" },
                      }}
                    >
                      <ReadMore />
                    </IconButton>
                   
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default AllPaymentTable;