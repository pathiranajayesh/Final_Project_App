import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import AllPaymentTable from "../../components/Tables/AllPaymentTable";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Text from "../../components/MUI Components/Text";
import { debounce, set } from "lodash";
import { Add, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import { PaymentDataType } from "../../types/PaymentType";
import { PaymentMethodEnum } from "../../types/PaymentMethodEnum";

const PaymentsList = () => {
    const [tableData, setTableData] = useState<PaymentDataType[]>(); // State to store the fetched data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const navigate = useNavigate();

    const samplePayments: PaymentDataType[] = [
        {
            id: "PAY56433",
            applicantId: "199456703490",
            amount: "LKR 120000.00",
            currency: "LKR",
            paymentMethod: PaymentMethodEnum.BankTransfer,
            paymentDate: "2025-03-25",
            status: "Completed",
            referenceNumber: "REF12345",
            notes: "Payment for March"
        },
        {
            id: "PAY56419",
            applicantId: "199456703490",
            amount: "LKR 200000.00",
            currency: "LKR",
            paymentMethod: PaymentMethodEnum.BankTransfer,
            paymentDate: "2025-02-05",
            status: "Pending",
            referenceNumber: "REF12346",
            notes: "Payment for February"
        },
        {
            id: "PAY67890",
            applicantId: "956731978V",
            amount: "GBP 500.00",
            currency: "GBP",
            paymentMethod: PaymentMethodEnum.BankDeposit,
            paymentDate: "2025-04-12",
            status: "Failed",
            referenceNumber: "REF12347",
            notes: "Payment for April"
        }
    ];

    const initialValues = {
        keyword: "",
    };

    const validationSchema = Yup.object().shape({
        keyword: Yup.string().required("Keyword is required"),
    });

    const handleSubmit = () => {
        // Handle form submission
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/api/Payment");
            const result = await response.data;
            setTableData(result); // Set fetched data to state
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false); // Set loading to false after fetching is done
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to ensure it runs only once when the component mounts

    const searchData = async (value: string | number | boolean) => {
        try {
            const response = await axiosInstance.get(
                `/api/Payments/search?keyword=${encodeURIComponent(value)}`
            );
            const result = response.data;
            setTableData(result); // Set fetched data to state
        } catch (err) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false); // Set loading to false after fetching is done
        }
    };

    const handleKeywordChange = debounce((value: any) => {
        if (value === "") {
            fetchData();
        } else {
            searchData(value);
        }
    }, 500);

    const handleAddPaymentClick = () => {
        navigate("/payments/add");
    };

    return (
        <div>
            <h1>Payments</h1>
            <hr />
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "95%" }}>
                <Box sx={{ display: "flex", justifyContent: "start", width: "100%" }}>
                    {/* Search bar */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form style={{ display: "flex", width: "30%" }}>
                                <Text
                                    name="keyword"
                                    placeholder="Type to search..."
                                    label={"Quick Search"}
                                    onChange={(e: { target: { value: any } }) => {
                                        setFieldValue("keyword", e.target.value);
                                        handleKeywordChange(e.target.value);
                                    }}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton aria-label="search">
                                                        <Search />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Form>
                        )}
                    </Formik>
                </Box>
                {/* <Box sx={{ display: "flex", justifyContent: "end", width: "100%", maxHeight: "10" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "1rem" }}
                        sx={{ maxHeight: "10" }}
                        onClick={handleAddPaymentClick}
                    >
                        <Add /> Add New Payment
                    </Button>
                </Box> */}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", width: "95%" }}>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!loading && tableData?.length === 0 && <p>No Payment data found!</p>}
                <AllPaymentTable tableData={tableData || []} />
            </Box>
        </div>
    );
};

export default PaymentsList;