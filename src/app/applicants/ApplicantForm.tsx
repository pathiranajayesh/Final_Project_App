import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    Typography,
    Stack,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Snackbar,
    Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Text from "../../components/MUI Components/Text";
import Select from "../../components/MUI Components/SelectField";
import { ChevronLeft } from "@mui/icons-material";
import axiosInstance from "../../auth/axiosInstance";

// Validation Schema
const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    fullName: Yup.string().required("Full Name is required"),
    nameWithInitials: Yup.string().nullable(),
    nicNumber: Yup.string().required("NIC Number is required"),
    passportNumber: Yup.string().nullable(),
    dob: Yup.date().required("Date of Birth is required"),
    civilStatus: Yup.number().nullable(),
    numberOfDependants: Yup.number().min(0, "Cannot be negative").nullable(),
    addressLine1: Yup.string().nullable(),
    addressLine2: Yup.string().nullable(),
    addressLine3: Yup.string().nullable(),
    area: Yup.string().nullable(),
    city: Yup.string().nullable(),
    district: Yup.string().nullable(),
    province: Yup.string().nullable(),
    policeArea: Yup.string().nullable(),
    postalCode: Yup.string().nullable(),
    phoneMobile: Yup.string().required("Mobile Phone is required"),
    phoneMobile2: Yup.string().nullable(),
    phoneFixed: Yup.string().nullable(),
    whatsAppMobile: Yup.string().nullable(),
    email: Yup.string().email("Invalid email address").nullable(),
    notes: Yup.string().nullable(),
    active: Yup.boolean().nullable(),
});

const civilStatusOptions = [
    { value: 1, label: "Single" },
    { value: 2, label: "Married" },
    { value: 3, label: "Divorced" },
    { value: 4, label: "Widowed" },
];

const ApplicantForm = ({ isCreating }: { isCreating: boolean }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        id: isCreating? null : id,
        firstName: "",
        lastName: "",
        fullName: "",
        nameWithInitials: "",
        nicNumber: "",
        passportNumber: "",
        dob: "", 
        email: "",
        phoneMobile: "",
        phoneMobile2: "",
        phoneFixed: "",
        whatsAppMobile: "",
        civilStatus: 1,
        numberOfDependants: 0,
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        area: "",
        city: "",
        district: "",
        province: "",
        policeArea: "",
        postalCode: "",
        spouse_Fullname: "",
        spouse_NICNumber: "",
        spouse_PhoneMobile: "",
        spouse_AddressLine1: "",
        spouse_AddressLine2: "",
        spouse_AddressLine3: "",
        mother_Fullname: "",
        mother_NICNumber: "",
        mother_PhoneMobile: "",
        mother_AddressLine1: "",
        mother_AddressLine2: "",
        mother_AddressLine3: "",
        father_Fullname: "",
        father_NICNumber: "",
        father_PhoneMobile: "",
        father_AddressLine1: "",
        father_AddressLine2: "",
        father_AddressLine3: "",
        notes: "",
        active: true,
    });
    const [loading, setLoading] = useState(!isCreating);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (!isCreating && id) {
            const fetchApplicant = async () => {
                try {
                    const response = await axiosInstance.get(`/api/Applicant/${id}`);
                    response.data.dob = new Date(response.data.dob).toISOString().split("T")[0];
                    setInitialValues(response.data);
                    // initialValues.dob = new Date(response.data.dob).toISOString().split("T")[0];
                } catch (err) {
                    setError("Failed to fetch applicant data");
                } finally {
                    setLoading(false);
                }
            };

            fetchApplicant();
        }
    }, [id, isCreating]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            if (isCreating) {
                const payload = { ...values };
                delete payload.id; // Remove `id` for create mode
                await axiosInstance.post("/api/Applicant", payload);
                alert("Applicant added successfully!");
            } else {
                await axiosInstance.put(`/api/Applicant/${id}`, values);
                alert("Applicant updated successfully!");
            }
            navigate(`/applicant`);
        } catch (err) {
            setError("Failed to save applicant data");
        }
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3, maxWidth: 1000, boxShadow: 2, borderRadius: 2, backgroundColor: "#fff" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={handleGoBack}
                >
                    <ChevronLeft /> Back
                </Button>
                {isCreating ? "Add Applicant" : "Edit Applicant"}
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Stack spacing={2}>
                            {/* Render the same fields as before */}
                            <Text name="firstName" label="First Name" required/>
                            <Text name="lastName" label="Last Name" required/>
                            <Text name="fullName" label="Full Name" required />
                            <Text name="nameWithInitials" label="Name with Initials" />
                            <Text name="nicNumber" label="NIC Number" required/>
                            <Text name="passportNumber" label="Passport Number" />
                            <Text name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} required/>
                            <Text name="email" label="Email" />
                            <Text name="phoneMobile" label="Phone (Mobile)" required/>
                            <Text name="phoneMobile2" label="Phone (Mobile 2)" />
                            <Text name="phoneFixed" label="Phone (Fixed)" />
                            <Text name="whatsAppMobile" label="WhatsApp (Mobile)" />

                            <Select name="civilStatus" label="Civil Status" options={civilStatusOptions} />
                            <Text name="numberOfDependants" label="Number of Dependants" type="number" />
                            <Text name="addressLine1" label="Address Line 1" />
                            <Text name="addressLine2" label="Address Line 2" />
                            <Text name="addressLine3" label="Address Line 3" />
                            <Text name="area" label="Area" />
                            <Text name="city" label="City" />
                            <Text name="district" label="District" />
                            <Text name="province" label="Province" />
                            <Text name="policeArea" label="Police Area" />
                            <Text name="postalCode" label="Postal Code" />
                           

                            {/* Spouse Details Accordion */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Spouse Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Text name="spouse_Fullname" label="Spouse Full Name" />
                                    <Text name="spouse_NICNumber" label="Spouse NIC Number" />
                                    <Text name="spouse_PhoneMobile" label="Spouse Phone (Mobile)" />
                                    <Text name="spouse_AddressLine1" label="Spouse Address Line 1" />
                                    <Text name="spouse_AddressLine2" label="Spouse Address Line 2" />
                                    <Text name="spouse_AddressLine3" label="Spouse Address Line 3" />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Mother/Father Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Text name="mother_Fullname" label="Mother Full Name" />
                                    <Text name="mother_NICNumber" label="Mother NIC Number" />
                                    <Text name="mother_PhoneMobile" label="Mother Phone (Mobile)" />
                                    <Text name="mother_AddressLine1" label=" Mother Address Line 1" />
                                    <Text name="mother_AddressLine2" label=" Mother Address Line 2" />
                                    <Text name="mother_AddressLine3" label=" Mother Address Line 3" />
                                    <Text name="father_Fullname" label=" Father Full Name" />
                                    <Text name="father_NICNumber" label=" Father NIC Number" />
                                    <Text name="father_PhoneMobile" label=" Father Phone (Mobile)" />
                                    <Text name="father_AddressLine1" label=" Father Address Line 1" />
                                    <Text name="father_AddressLine2" label=" Father Address Line 2" />
                                    <Text name="father_AddressLine3" label=" Father Address Line 3" />
                                </AccordionDetails>
                            </Accordion>
                            
                            <Text name="notes" label="Notes" multiline rows={4} />
                            {/* <Checkbox name="active" label="Active" /> */}

                            <Stack direction="row" spacing={2} sx={{ mt: 2 }} justifyContent={"flex-end"}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting }
                                >
                                    {isCreating ? "Add Applicant" : "Save Changes"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => navigate(`/applicant`)}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </Form>
                )}
            </Formik>


            {/* Snackbar for submission */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} > 
                <Alert onClose={handleClose} severity={error ? "error" : "success"}>
                    {error ? "Failed to update applicant data" : "Applicant updated successfully!"}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ApplicantForm;
