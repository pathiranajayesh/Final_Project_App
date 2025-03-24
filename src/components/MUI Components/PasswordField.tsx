import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useField } from 'formik';

interface PasswordProps {
  label: string;
  sx?: object;
  [key: string]: any;
}

const Password = ({ label, sx = {}, ...props }: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ ...props, name: props.name });

  return (
    <TextField
      {...field}
      {...props}
      type={showPassword ? 'text' : 'password'}
      label={label}
      fullWidth
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ''}
      sx={{ marginBottom: 2, ...sx }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Password;
