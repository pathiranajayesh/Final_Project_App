import { Box, Button, IconButton, InputAdornment } from "@mui/material";
import AllAgentTable from "../../components/Tables/AllAgentTable";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import Text from '../../components/MUI Components/Text';
import { debounce } from 'lodash';
import { Add, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";
import { AgentDataType } from "../../types/AgentType";




const AgentList = () => {
  const [tableData, setTableData] = useState<AgentDataType[]>([]); // State to store the fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();

  const initialValues = {
    keyword: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required')

  });

  const handleSubmit = () => {
    // console.log('Form values:', values);
  };

  const sampleAgentData: AgentDataType[] = [
    {
      name: "John Doe",
      id: "A123",
      fullName: "Johnathan Doe",
      nicNumber: "123456789V",
      isActive: true,
    },
    {
      name: "Jane Smith",
      id: "B456",
      fullName: "Jane Alexandra Smith",
      nicNumber: "987654321V",
      isActive: false,
    },
    {
      name: undefined,
      id: "C789",
      fullName: "Unknown Agent",
      nicNumber: undefined,
      isActive: true,
    },
  ];
  const fetchData = async () => {
    try {
      // const response = await axiosInstance.get('/api/Agent');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
      // const result = await response.data;
      setTableData(sampleAgentData); // Set fetched data to state
    } catch (err) {
      setError('Failed to fetch data');
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
      const response = await axiosInstance.get(`/api/Agent/search?keyword=${encodeURIComponent(value)}`);
      const result = response.data;
      setTableData(result); // Set fetched data to state
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };


  const handleKeywordChange = debounce((value: any) => {
    if (value === "") {
      fetchData();
    }
    else {
      searchData(value);
    }
  }, 500);

  const handleAddAgentClick = () => {
    navigate('/agent/add');
  }



  return (
    <div>
      <h1>Agent List</h1>

      <hr />
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "95%" }}>
        <Box sx={{ display: "flex", justifyContent: "start", width: "100%" }}>
          {/* Search bar goes here */}

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
                  // startAdornment={<i className="fa-regular fa-user"></i>}
                  label={"Quick Search"}
                  onChange={(e: { target: { value: any; }; }) => {
                    setFieldValue('keyword', e.target.value);
                    handleKeywordChange(e.target.value);
                  }}
                  slotProps={{
                    input: {
                      startAdornment:
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="description for action"

                          >
                            <Search />
                          </IconButton>
                        </InputAdornment>
                    },
                  }}
                />
              </Form>
            )}
          </Formik>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%", maxHeight: "10" }}>

          <Button
            variant="contained"
            color="primary"
            // type="submit"
            style={{ marginLeft: "1rem" }}
            sx={{ maxHeight: "10" }}
            onClick={handleAddAgentClick}
          >
            <Add /> Add New Agent
          </Button>
        </Box>
      </Box>



      <Box sx={{ display: "flex", justifyContent: "center", width: "95%" }}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && tableData.length===0 && <p>No Agent data found!</p>}
        <AllAgentTable tableData={tableData} />
      </Box>

    </div>
  );
};
export default AgentList;
