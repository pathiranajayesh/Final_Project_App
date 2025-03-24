import { Box, Typography } from "@mui/material";
import AuthForm from "../../components/Forms/AuthForm";



const Login = () => {
  return (
    <div >
      <Box
            sx={{
                position: 'relative',
                width: '100vw',
                minHeight: '100vh',
                background: 'url(/img/bg-img/auth-bg.png) center center no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    borderRadius: '10px',
                    marginY: '3rem',
                    maxWidth: '500px',
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    
                }}
            >
                <Box
                    sx={{
                        height: '150px',
                        paddingX: '155px',
                        paddingY: '20px',
                        margin: 'auto',
                    }}
                >
                  <img src="/img/bg-img/logo.png" alt=""   width={200} height={200}/>
                </Box>
                <Box sx={{ padding: '2.5rem' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            marginBottom: '26px',
                        }}
                    >
                        Welcome!
                    </Typography>
                    <AuthForm />
                </Box>
            </Box>

      </Box>
    </div>
  );
};
export default Login;
