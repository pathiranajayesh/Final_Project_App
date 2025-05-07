import {
    Box,
    Typography,
    Stack,
    Divider,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { useEffect, useState } from "react";
  import { PaymentDataType } from "../../types/PaymentType";
  import { ChevronLeft } from "@mui/icons-material";
  import { useNavigate, useParams } from "react-router-dom";
  import axiosInstance from "../../auth/axiosInstance";
import { PaymentMethodEnum } from "../../types/PaymentMethodEnum";
  
  const PaymentView = () => {
    let { id } = useParams();
    const [payment, setPayment] = useState<PaymentDataType | null>(null); // State to store payment data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const navigate = useNavigate();
  
    const handleGoBack = () => {
      navigate(-1); // Go back to the previous page
    };
  
    useEffect(() => {
      // Fetch payment data when the component mounts
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/api/Payments/${id}`); // Replace with your API URL
          const result = await response.data;
          setPayment(result); // Set fetched data to state
        } catch (err) {
          setError("Failed to fetch payment data");
        } finally {
          setLoading(false); // Set loading to false after fetching is done
        }
      };
  
      fetchData();
    }, [id]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <Box sx={{ p: 3 }} maxWidth={1500}>
        {/* Page Title */}
        <Typography variant="h4" sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
            onClick={handleGoBack}
          >
            <ChevronLeft /> Back
          </Button>
          Payment: {payment?.id}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack direction="row" spacing={2}>
          {/* Payment Details */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              mx: "auto",
              textAlign: "left",
              backgroundColor: "background.default",
              boxShadow: 1,
              minWidth: 500,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="left"
              sx={{ mb: 2 }}
            >
              <Typography variant="h5">Payment Information</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="left">
              <Box alignItems={"center"} width={1000} sx={{ color: "text.secondary" }}>
                <List dense>
                  {/* Basic Details */}
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography
                        component={"span"}
                        variant="subtitle1"
                        sx={{ mb: 1, fontWeight: "bold" }}
                      >
                        Payment Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ListItem>
                        <ListItemText
                          primary="Payment ID:"
                          secondary={payment?.id}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Applicant ID:"
                          secondary={payment?.applicantId}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Amount:"
                          secondary={`${payment?.amount} ${payment?.currency}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Payment Method:"
                          secondary={payment?.paymentMethod !== undefined ? PaymentMethodEnum[payment.paymentMethod] : "Unknown"}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Payment Date:"
                          secondary={payment?.paymentDate}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Status:"
                          secondary={payment?.status}
                        />
                      </ListItem>
                    </AccordionDetails>
                  </Accordion>
                </List>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  };
  
  export default PaymentView;