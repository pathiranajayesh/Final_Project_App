import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../auth/axiosInstance";
import { Box, Button, Divider, Snackbar, Stack, Typography,Alert } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { Formik, Form } from "formik";
import Text from "../../components/MUI Components/Text";

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    fullName: Yup.string().required("Full Name is required"),
    nicNumber: Yup.string().required("NIC Numer is required"),
    dob: Yup.string().required("Date of Birth is required"),
    addressLine1: Yup.string().nullable(),
    addressLine2: Yup.string().nullable(),
    addressLine3: Yup.string().nullable(),
    area: Yup.string().nullable(),
    city: Yup.string().nullable(),
    district: Yup.string().nullable(),
    province: Yup.string().nullable(),
    policeArea: Yup.string().nullable(),
    postalCode: Yup.string().nullable(),
    phoneMobile: Yup.string().required("Mobile phone is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    notes: Yup.string().nullable(),
    active: Yup.boolean().nullable(),
    });

const AgentForm = ({isCreating}:{isCreating:boolean})=>{
    const {id} = useParams();
    const navigate = useNavigate();
    const [initialValues,setInitialValues] = useState({
        id: isCreating? null : id,
        firstName: "",
        lastName: "",
        fullName: "",
        nicNumber: "",
        dob: "",
        phoneMobile: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        area: "",
        city: "",
        district: "",
        province: "",
        policeArea: "",
        postalCode: "",
        notes: "",
        active: true,
    });

const [loading,SetLoading] = useState(!isCreating);
const [error,SetError] = useState<string | null>(null);
const [open,SetOpen] = useState(false);

const handleGoBack = () =>{
    navigate(-1);
};
useEffect(()=>{
    if(!isCreating && id) {
        const fetchAgent = async () =>{
            try{
                const response = await axiosInstance.get(`/api/Agent/${id}`);
                response.data.dob = new Date(response.data.dob).toISOString().split("T")[0];
                setInitialValues(response.data);
            } catch(err){
                SetError("Failed to fetch agent data")
            } finally{
                SetLoading(false);
            }
        };
        fetchAgent();
    }
},[id, isCreating]);

const handleClose = () =>{
    SetOpen(false);
};

const handleSubmit = async (values:typeof initialValues)=>{
    try{
        if(isCreating){
            const payLoad = {...values};
            delete payLoad.id;
            await axiosInstance.post("/api/Agent",payLoad);
            alert("Agent added successfully!");
        }else{
            await axiosInstance.put(`/api/Agent/${id}`, values);
            alert("Agent updated successfully!");
        }
        navigate(`/agent`)
    } catch(err) {
        SetError("Failed to save agent's data.")
    }
};
if(loading) return <Typography>Loading....</Typography>

return(
    <Box sx={{p:3, maxWidth:1000, boxShadow:2, borderRadius:2, backgroundColor: "#fff"}}>
        <Typography variant="h4" sx={{mb:3}}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoBack}
            >
                <ChevronLeft/> Back
            </Button>
            {isCreating ? "Add Agent" : " Edit Agent"}
        </Typography>
        <Divider sx={{mb:3}}/>

        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({isSubmitting}) => (
                <Form>
                    <Stack spacing={2}>
                        <Text name="firstName" label="First Name" required/>
                        <Text name="lastName" label="Last Name" required/>
                        <Text name="fullName" label="Full Name" required />
                        <Text name="nicNumber" label="NIC Number" required/>
                        <Text name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} required/>
                        <Text name="email" label="Email" />
                        <Text name="phoneMobile" label="Phone (Mobile)" required/>
                        <Text name="addressLine1" label="Address Line 1" />
                        <Text name="addressLine2" label="Address Line 2" />
                        <Text name="addressLine3" label="Address Line 3" />
                        <Text name="area" label="Area" />
                        <Text name="city" label="City" />
                        <Text name="district" label="District" />
                        <Text name="province" label="Province" />
                        <Text name="policeArea" label="Police Area" />
                        <Text name="postalCode" label="Postal Code" />
                        <Text name="notes" label="Notes" multiline rows={4} />

                        <Stack direction="row" spacing={2} sx={{mt:2}} justifyContent={"flex-end"}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                {isCreating ? "Add Agent" : "Save Changes"}
                            </Button>

                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate (`/agent`)}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}

        </Formik>

        <Snackbar open={open} autoHideDuration={6000}onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal:"right"}}> 
            <Alert onClose={handleClose} severity={error ? "error":"success"}>
                {error ? "Failed to update agent data" : "Agent updated successfully!"}
            </Alert>
        </Snackbar>
    </Box>
);


};

export default AgentForm;