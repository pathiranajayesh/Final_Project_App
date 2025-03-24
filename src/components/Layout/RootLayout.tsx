import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import LeftNavigationDrawer from './LeftNavigationDrawer';



const RootLayout = () => {
    return (
        <>
        <LeftNavigationDrawer />
        <Box component="main" sx={{ flexGrow: 1, paddingLeft:'5%', paddingTop:'1%', marginBottom: '100px',backgroundColor: "#f5f5f5"}}>
            <Outlet />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "rgb(226, 117, 67)", padding: 2, borderTop: "1px solid #e0e0e0", zIndex: 1000 }}>
            <Box sx={{fontSize:12, alignContent:'flex-end', color:"#fff"}} >&nbsp; &nbsp;  Sky Europe Jobs @ 2025</Box>
        </Box>
        </>
    );
}; 

export default RootLayout;
