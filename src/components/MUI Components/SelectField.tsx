import { TextField, MenuItem } from '@mui/material';
import { useField } from 'formik';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  sx?: object;
  [key: string]: any;
}

const Select = ({ label, options, sx = {}, ...props }: SelectProps) => {
  const [field, meta] = useField({ ...props, name: props.name });

  return (
    <TextField
      {...field}
      {...props}
      select
      label={label}
      fullWidth
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : ''}
      sx={{ marginBottom: 2, ...sx }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
