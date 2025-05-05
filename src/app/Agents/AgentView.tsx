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
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { AirplaneTicket, Badge, Call, ChevronLeft, Mail, SpeakerNotes, WhatsApp } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import { AgentDataType } from "../../types/AgentType";

var agent = {} as AgentDataType;

var primaryTypographyProps = { fontWeight: 'bold', color: 'text.secondary', fontSize: 14, };
var secondaryTypographyProps = { pl: 3, fontSize: 14, };
var listItemTextProps = { primaryTypographyProps, secondaryTypographyProps };



const AgentView = () => {
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
                const response = await axiosInstance.get(`/api/Agent/${id}`); // Replace with your API URL
                const result = await response.data;
                agent = result; // Set fetched data to state
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
                {/* Agent: {agent.passportNumber} - {agent.fullName} */}
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
                                        {/* <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>First Name:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.firstName}</Typography>}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Last Name:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.lastName}</Typography>}
                                            />
                                        </ListItem> */}
                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Full Name:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.fullName}</Typography>}
                                            />
                                        </ListItem>

                                        {/* <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Name with Initials:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.nameWithInitials}</Typography>}
                                            />
                                        </ListItem> */}

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>NIC Number:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.nicNumber}</Typography>}
                                            />
                                        </ListItem>

                                        {/* <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Passport Number:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.passportNumber}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Date of Birth:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>
                                                    {agent.dob ? new Date(agent.dob).toISOString().split("T")[0] : 'n/a'}
                                                </Typography>}
                                            />
                                        </ListItem> */}

                                        {/* <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Civil Status:</Typography>}
                                                secondary={
                                                    <Typography sx={listItemTextProps.secondaryTypographyProps}>
                                                        {
                                                            agent.civilStatus == 1 ? "Single" :
                                                                agent.civilStatus == 2 ? "Married" :
                                                                    agent.civilStatus == 3 ? "Divorced" :
                                                                        agent.civilStatus == 4 ? "Widowed" : "Unknown"
                                                        }
                                                    </Typography>
                                                }
                                            />
                                        </ListItem> */}
{/* 
                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Number of Dependants:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.numberOfDependants}</Typography>}
                                            />
                                        </ListItem> */}

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Status:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>
                                                    {agent.isActive ? 'Active' : 'Inactive'}
                                                </Typography>}
                                            />
                                        </ListItem>
{/* 
                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Address:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.addressLine1}, {agent.addressLine2}, {agent.addressLine3}</Typography>}
                                            />
                                        </ListItem> */}
                                        {/* <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Area:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.area}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>City:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.city}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>District:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.district}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Province:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.province}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Police Area:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.policeArea}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Postal Code:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.postalCode}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Phone (Mobile):</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.phoneMobile}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Phone (Mobile 2):</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.phoneMobile2}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Phone (Fixed):</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.phoneFixed}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>WhatsApp (Mobile):</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.whatsAppMobile}</Typography>}
                                            />
                                        </ListItem>


                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Registered On:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>
                                                    {agent.registerdOn instanceof Date ? agent.registerdOn.toLocaleDateString() : ''}
                                                </Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Registered By:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.registerdBy}</Typography>}
                                            />
                                        </ListItem>

                                        <ListItem>
                                            <ListItemText
                                                sx={{ display: 'flex', flexDirection: 'row' }}
                                                primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Notes:</Typography>}
                                                secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.notes}</Typography>}
                                            />
                                        </ListItem> */}
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
                                {/* <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Spouse Full Name:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.spouse_Fullname ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Spouse NIC Number:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.spouse_NICNumber ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Spouse Phone (Mobile):</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.spouse_PhoneMobile ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Spouse Address:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.spouse_AddressLine1 ?? ''}, {agent.spouse_AddressLine2 ?? ''}, {agent.spouse_AddressLine3 ?? ''}</Typography>}
                                    />
                                </ListItem> */}
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
                                {/* <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Mother Full Name:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.mother_Fullname ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Mother NIC Number:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.mother_NICNumber ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Mother Phone (Mobile):</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.mother_PhoneMobile ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Mother Address:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.mother_AddressLine1 ?? ''}, {agent.mother_AddressLine2 ?? ''}, {agent.mother_AddressLine3 ?? ''}</Typography>}
                                    />
                                </ListItem>

                                {/* Father's Details */}
                                {/* <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Father Full Name:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.father_Fullname ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Father NIC Number:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.father_NICNumber ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Father Phone (Mobile):</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.father_PhoneMobile ?? ''}</Typography>}
                                    />
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                        primary={<Typography sx={listItemTextProps.primaryTypographyProps}>Father Address:</Typography>}
                                        secondary={<Typography sx={listItemTextProps.secondaryTypographyProps}>{agent.father_AddressLine1 ?? ''}, {agent.father_AddressLine2 ?? ''}, {agent.father_AddressLine3 ?? ''}</Typography>}
                                    /> 
                                </ListItem> */}
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
                <Box sx={{ p: 3, borderRadius: 2, textAlign: "center", backgroundColor: "rgb(120, 192, 214)", boxShadow: 1, minWidth: 500, justifyContent: "center", maxHeight: 400 }}>
                    {/* Profile Image Section */}
                    <Box sx={{ position: "relative", mb: 2 }} width={500} textAlign={"left"}>
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
                        {/* <IconButton
                        sx={{
                            position: "absolute",
                            bottom: 20,
                            left: "12%",
                            transform: "translate(50%, 50%)",
                            backgroundColor: "primary.main",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        }}
                    >
                        <CameraAlt />
                    </IconButton> */}
                        {/* User Details */}
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            {agent.fullName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: 14 }}>
                            {/* <Call /> <strong> Mobile :</strong>   {agent.phoneMobile} <br />
                            <WhatsApp /> <strong> WhatsApp :</strong>  {agent.whatsAppMobile} <br />
                            <Mail /> <strong> Email :</strong>  {agent.email} <br />
                            <Badge /> <strong> NIC :</strong>  {agent.nicNumber} <br />
                            <AirplaneTicket /><strong> Passport :</strong>  {agent.passportNumber} <br />
                            <SpeakerNotes /> <strong> Special Notes :</strong>  {agent.notes} <br /> */}
                        </Typography>

                    </Box>

                </Box>

            </Stack>



        </Box>
    );
};

export default AgentView;
