import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

interface TextProps {
  label: string;
  sx?: object;
  [key: string]: any;
}

const Text: React.FC<TextProps> = ({ label, sx = {}, ...props }) => {
  const [field, meta] = useField({ ...props, name: props.name });

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      fullWidth
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ''}
      sx={{ marginBottom: 2, ...sx }}
    />
  );
};

export default Text;
