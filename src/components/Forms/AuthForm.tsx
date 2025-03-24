import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Text from '../MUI Components/Text';
import Password from '../MUI Components/PasswordField';
import Button from '@mui/material/Button';
import { login } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
    register?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ register }) => {
    const { setAccessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        rememberMe: false,
        terms: false,
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: register
            ? Yup.string().email('Invalid email').required('Email is required')
            : Yup.string(),
        password: Yup.string().required('Password is required'),
        terms: register
            ? Yup.boolean().oneOf([true], 'You must accept Terms & Policy')
            : Yup.boolean(),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const data = await login(values.username, values.password);
            setAccessToken(data.accessToken);
            navigate("/applicant");
        } catch (error) {
            console.error("Login failed", error);
            alert("Login failed : Username or password is incorrect");
            initialValues.email = '';
            initialValues.password = '';
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    {/* Username Field */}
                    <Text
                        name="username"
                        label="Username or email address"
                        placeholder="Username or email address"
                        startAdornment={<i className="fa-regular fa-user"></i>}
                    />
                    {/* Password Field */}
                    <Password
                        name="password"
                        label="Password"
                        placeholder="Password"
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        {register ? 'Register' : 'Sign In'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default AuthForm;
