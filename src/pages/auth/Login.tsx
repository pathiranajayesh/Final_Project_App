import React from 'react';
// import AuthTopLogo from './AuthTopLogo';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthForm from '../../components/Forms/AuthForm';

const Login = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                minHeight: '100vh',
                background: 'url(/img/bg-img/auth-bg-light.png) center center no-repeat',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box
                    sx={{
                        height: '100px',
                        paddingX: '30px',
                        borderBottom: '1px solid rgba(223, 223, 223, 0.15)',
                    }}
                >
                    {/* <AuthTopLogo /> LOGO Goes Here */}
                </Box>
                <Box sx={{ padding: '2.5rem' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            fontSize: '24px',
                            fontWeight: 400,
                            color: '#595959',
                            marginBottom: '26px',
                        }}
                    >
                        Login
                    </Typography>
                    <AuthForm />
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
