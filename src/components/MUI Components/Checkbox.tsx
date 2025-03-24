import { Checkbox as MUICheckbox, FormControlLabel } from '@mui/material';
import { useField } from 'formik';

interface CheckboxProps {
  label: string;
  sx?: object;
  [key: string]: any;
}

const Checkbox = ({ label, sx = {}, ...props }: CheckboxProps) => {
  const [field] = useField({ ...props, name: props.name, type: 'checkbox' });

  return (
    <FormControlLabel
      control={<MUICheckbox {...field} {...props} />}
      label={label}
      sx={{ marginBottom: 2, ...sx }}
    />
  );
};

export default Checkbox;
