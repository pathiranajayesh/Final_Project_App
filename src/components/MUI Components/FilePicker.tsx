import { useField, useFormikContext } from 'formik';
import { Button, Typography } from '@mui/material';

interface FilePickerProps {
  label: string;
  sx?: object;
  [key: string]: any;
}

const FilePicker = ({ label, sx = {}, ...props }: FilePickerProps) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField({ ...props, name: props.name });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setFieldValue(field.name, event.currentTarget.files[0]);
    }
  };

  return (
    <div style={{ marginBottom: 16, ...sx }}>
      <Button variant="contained" component="label">
        {label}
        <input type="file" hidden {...props} onChange={handleChange} />
      </Button>
      {field.value && <Typography variant="body2">{field.value.name}</Typography>}
      {meta.touched && meta.error && (
        <Typography color="error" variant="caption">
          {meta.error}
        </Typography>
      )}
    </div>
  );
};

export default FilePicker;
