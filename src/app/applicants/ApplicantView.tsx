//import { useParams } from "react-router";
import {
    Box,
    Typography,
    Avatar,
    Stack,
    Divider,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { ApplicantDataType } from "../../types/ApplicantType";
import { AirplaneTicket, Badge, Call, ChevronLeft, Download, Mail, OpenInNew, Print, SpeakerNotes, WhatsApp } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import { Formik } from "formik";
import * as Yup from "yup";

var applicant = {} as ApplicantDataType;

var primaryTypographyProps = { fontWeight: 'bold', color: 'text.secondary', fontSize: 14, };
var secondaryTypographyProps = { pl: 3, fontSize: 14, };
var listItemTextProps = { primaryTypographyProps, secondaryTypographyProps };



const ApplicantView = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/api/Applicant/${id}`); // Replace with your API URL
                const result = await response.data;
                applicant = result; // Set fetched data to state
            } catch (err) {
                setError('Failed to fetch data');
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
                Applicant: {applicant.passportNumber} - {applicant.fullName}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack direction="row" spacing={2} >
                {/* Profile Sidebar */}
                <Box
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        //maxWidth: 600,
                        mx: "auto",
                        textAlign: "left",
                        backgroundColor: "background.default",
                        boxShadow: 1,
                        minWidth: 500
                    }}
                >
                    {/* Header Section */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="left"
                        sx={{ mb: 2 }}
                    >
                        <Typography variant="h5">User Information</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="left"
                    >
                        <Box alignItems={"center"} width={1000} sx={{ color: "text.secondary" }}>

                            <List dense>
                                {/* Basic Details */}
                                <Accordion defaultExpanded>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        <Typography component={"span"} variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                                            Personal Details
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>First Name:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.firstName}</Typography>}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Last Name:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.lastName}</Typography>}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Full Name:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.fullName}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Name with Initials:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.nameWithInitials}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>NIC Number:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.nicNumber}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Passport Number:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.passportNumber}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Date of Birth:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>
                                                    {applicant.dob ? new Date(applicant.dob).toISOString().split("T")[0] : 'n/a'}
                                                </Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Civil Status:</Typography>}
                                                secondary={
                                                    <Typography sx={listItemTextProps.secondaryTypographyProps}>
                                                        {
                                                            applicant.civilStatus == 1 ? "Single" :
                                                                applicant.civilStatus == 2 ? "Married" :
                                                                    applicant.civilStatus == 3 ? "Divorced" :
                                                                        applicant.civilStatus == 4 ? "Widowed" : "Unknown"
                                                        }
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Number of Dependants:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.numberOfDependants}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Status:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>
                                                    {applicant.isActive ? 'Active' : 'Inactive'}
                                                </Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Address:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.addressLine1}, {applicant.addressLine2}, {applicant.addressLine3}</Typography>}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Area:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.area}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>City:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.city}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>District:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.district}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Province:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.province}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Police Area:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.policeArea}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Postal Code:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.postalCode}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Phone (Mobile):</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.phoneMobile}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Phone (Mobile 2):</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.phoneMobile2}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Phone (Fixed):</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.phoneFixed}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>WhatsApp (Mobile):</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.whatsAppMobile}</Typography>}
                                            />
                                        </ListItem>


                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Registered On:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>
                                                    {applicant.registerdOn instanceof Date ? applicant.registerdOn.toLocaleDateString() : ''}
                                                </Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Registered By:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.registerdBy}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Notes:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.notes}</Typography>}
                                            />
                                        </ListItem>
                                    </AccordionDetails>
                                </Accordion>
                            </List>
                        </Box>

                    </Stack>
                    <Stack sx={{ mb: 2 }}
                    >
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component={"span"} variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                                    Spouse Details
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Spouse Full Name:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.spouse_Fullname ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Spouse NIC Number:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.spouse_NICNumber ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Spouse Phone (Mobile):</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.spouse_PhoneMobile ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Spouse Address:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.spouse_AddressLine1 ?? ''}, {applicant.spouse_AddressLine2 ?? ''}, {applicant.spouse_AddressLine3 ?? ''}</Typography>}
                                    />
                                </ListItem>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>

                    <Stack sx={{ mb: 2 }}
                    >
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component={"span"} variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                                    Mother/Father Details
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Mother Full Name:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.mother_Fullname ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Mother NIC Number:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.mother_NICNumber ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Mother Phone (Mobile):</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.mother_PhoneMobile ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Mother Address:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.mother_AddressLine1 ?? ''}, {applicant.mother_AddressLine2 ?? ''}, {applicant.mother_AddressLine3 ?? ''}</Typography>}
                                    />
                                </ListItem>

                                {/* Father's Details */}
                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Father Full Name:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.father_Fullname ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Father NIC Number:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.father_NICNumber ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Father Phone (Mobile):</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.father_PhoneMobile ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Father Address:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{applicant.father_AddressLine1 ?? ''}, {applicant.father_AddressLine2 ?? ''}, {applicant.father_AddressLine3 ?? ''}</Typography>}
                                    />
                                </ListItem>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                    {/* About Me */}




                    <Divider sx={{ my: 2 }} />

                    {/* About Me
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
                        Process notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Test note Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, a. Iure alias illum, aliquid placeat omtempore mollitia nemo voluptate voluptates sed voluptatum neque?
                    </Typography> */}
                </Box>
                <Stack direction="column" spacing={2} >
                    <Box sx={{ p: 3, borderRadius: 2, textAlign: "center", backgroundColor: "rgb(120, 192, 214)", boxShadow: 1, minWidth: 500, justifyContent: "center", maxHeight: 400 }}>
                        {/* Profile Image Section */}
                        <Box sx={{ position: "relative", mb: 2 }} width={500} textAlign={"left"}>
                            <Box>
                                <Stack direction="row" spacing={2} >
                                    <Avatar
                                        src="/img/bg-img/user-palceholder.png"
                                        alt="admin"
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            //mx: "auto",
                                            border: "3px solid",
                                            borderColor: "primary.main",
                                        }}
                                    />

                                    <img src="/img/bg-img/199456703490.gif" alt="admin" width={200} height={150} style={{ position: "absolute", top: 15, left: 250 }} />
                                    <Print style={{ position: "absolute", top: 15, left: 460 }} />
                                    <Download style={{ position: "absolute", top: 90, left: 460 }} />
                                </Stack>


                            </Box>
                            {/* User Details */}
                            <Typography variant="h5" sx={{ mb: 1 }}>
                                {applicant.fullName}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: 14 }}>
                                <Call /> <strong> Mobile :</strong>   {applicant.phoneMobile} <br />
                                <WhatsApp /> <strong> WhatsApp :</strong>  {applicant.whatsAppMobile} <br />
                                <Mail /> <strong> Email :</strong>  {applicant.email} <br />
                                <Badge /> <strong> NIC :</strong>  {applicant.nicNumber} <br />
                                <AirplaneTicket /><strong> Passport :</strong>  {applicant.passportNumber} <br />
                                <SpeakerNotes /> <strong> Special Notes :</strong>  {applicant.notes} <br />
                            </Typography>

                        </Box>

                    </Box>
                    {/* Payment Section */}
                    <Box sx={{ p: 3, borderRadius: 2, textAlign: "center", backgroundColor: "rgb(203, 253, 220)", boxShadow: 1, minWidth: 500, justifyContent: "center", maxHeight: 400 }}>
                        <Box sx={{ position: "relative", mb: 2 }} width={500} textAlign={"left"}>
                            <Typography variant="h5" sx={{ mb: 1 }}>
                                Payments <a href="http://"><OpenInNew /></a>
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: 14 }}>
                                <table style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ padding: "8px", textAlign: "left" }}>Payment Date</th>
                                            <th style={{ padding: "8px", textAlign: "left" }}>Payment ID</th>
                                            <th style={{ padding: "8px", textAlign: "left" }}>Method</th>
                                            <th style={{ padding: "8px", textAlign: "left" }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicant.payments && applicant.payments.map((payment) => (
                                            <tr key={payment.id}>
                                                <td style={{ padding: "8px" }}>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                                <td style={{ padding: "8px" }}>{payment.referenceNumber}</td>
                                                <td style={{ padding: "8px" }}>{payment.paymentMethod}</td>
                                                <td style={{ padding: "8px" }}>{payment.currency} {payment.amount}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td style={{ padding: "8px" }}></td>
                                            <td style={{ padding: "8px" }}></td>
                                            <td style={{ padding: "8px", fontWeight: 900 }}>Total</td>
                                            <td style={{ padding: "8px", fontWeight: 900 }}>
                                                {applicant.payments && applicant.payments.reduce((total, payment) => total + parseFloat(payment.amount), 0).toFixed(2)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Typography>
                        </Box>
                    </Box>

                    {/* Add Payment Form */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="add-payment-content"
                            id="add-payment-header"
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Add Payment
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Formik
                                initialValues={{
                                    amount: "",
                                    currency: "LKR",
                                    paymentMethod: "BankTransfer",
                                    paymentDate: "",
                                    referenceNumber: "",
                                    notes: "",
                                }}
                                validationSchema={Yup.object({
                                    amount: Yup.number().required("Amount is required"),
                                    currency: Yup.string().required("Currency is required"),
                                    paymentMethod: Yup.string().required("Payment Method is required"),
                                    paymentDate: Yup.date().required("Payment Date is required"),
                                    referenceNumber: Yup.string().required("Reference Number is required"),
                                })}
                                onSubmit={async (values, { resetForm }) => {
                                    try {
                                        const response = await axiosInstance.post("/api/payment", {
                                            ...values,
                                            applicantId: applicant.id, // Attach the applicant ID
                                        });
                                        if (response.status === 201 || response.status === 200) {
                                            alert("Payment added successfully!");
                                            resetForm();
                                            // Optionally, refresh the payments list
                                        }
                                    } catch (error) {
                                        console.error("Error adding payment:", error);
                                        alert("Failed to add payment. Please try again.");
                                    }
                                }}
                            >
                                {({ handleChange, handleSubmit, values, errors, touched }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Stack spacing={2}>
                                            <TextField
                                                label="Amount"
                                                name="amount"
                                                value={values.amount}
                                                onChange={handleChange}
                                                error={touched.amount && Boolean(errors.amount)}
                                                helperText={touched.amount && errors.amount}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Currency"
                                                name="currency"
                                                value={values.currency}
                                                onChange={handleChange}
                                                error={touched.currency && Boolean(errors.currency)}
                                                helperText={touched.currency && errors.currency}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Payment Method"
                                                name="paymentMethod"
                                                value={values.paymentMethod}
                                                onChange={handleChange}
                                                error={touched.paymentMethod && Boolean(errors.paymentMethod)}
                                                helperText={touched.paymentMethod && errors.paymentMethod}
                                                fullWidth
                                                select
                                            >
                                                <MenuItem value="BankTransfer">Bank Transfer</MenuItem>
                                                <MenuItem value="CreditCard">Credit Card</MenuItem>
                                                <MenuItem value="PayPal">PayPal</MenuItem>
                                            </TextField>
                                            <TextField
                                                label="Payment Date"
                                                name="paymentDate"
                                                type="date"
                                                value={values.paymentDate}
                                                onChange={handleChange}
                                                error={touched.paymentDate && Boolean(errors.paymentDate)}
                                                helperText={touched.paymentDate && errors.paymentDate}
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <TextField
                                                label="Reference Number"
                                                name="referenceNumber"
                                                value={values.referenceNumber}
                                                onChange={handleChange}
                                                error={touched.referenceNumber && Boolean(errors.referenceNumber)}
                                                helperText={touched.referenceNumber && errors.referenceNumber}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Notes"
                                                name="notes"
                                                value={values.notes}
                                                onChange={handleChange}
                                                multiline
                                                rows={3}
                                                fullWidth
                                            />
                                            <Button type="submit" variant="contained" color="primary">
                                                Add Payment
                                            </Button>
                                        </Stack>
                                    </form>
                                )}
                            </Formik>
                        </AccordionDetails>
                    </Accordion>

                    <Box sx={{ p: 3, borderRadius: 2, textAlign: "center", backgroundColor: "rgb(221, 203, 154)", boxShadow: 1, minWidth: 500, justifyContent: "center", maxHeight: 400 }}>
                        {/* Schedule Section */}
                        <Box sx={{ position: "relative", mb: 2 }} width={500} textAlign={"left"}>
                            <Typography variant="h5" sx={{ mb: 1 }}>
                                Schedule <a href="http://"><OpenInNew /></a>
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: 14 }}>
                                <table style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ padding: "8px", textAlign: "left" }}>Event ID</th>
                                            <th style={{ padding: "8px", textAlign: "left" }}>Description</th>
                                            <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
                                            <th style={{ padding: "8px", textAlign: "left" }}>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicant.schedules && applicant.schedules.map((event) => (
                                            <tr key={event.id}>
                                                <td style={{ padding: "8px" }}>{event.id}</td>
                                                <td style={{ padding: "8px" }}>{event.description}</td>
                                                <td style={{ padding: "8px" }}>{new Date(event.scheduledDate).toLocaleDateString()}</td>
                                                <td style={{ padding: "8px" }}>{event.schdeduledTime}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Stack>

        </Box>
    );
};

export default ApplicantView;
