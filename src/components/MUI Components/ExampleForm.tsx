import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import Password from './PasswordField';
import Select from './SelectField';
import Checkbox from './Checkbox';
import FileUpload from './FilePicker';
import Slider from './Slider';
import { Button } from '@mui/material';

const initialValues = {
  text: '',
  password: '',
  select: '',
  date: null,
  checkbox: false,
  file: null,
  slider: 50,
};

const validationSchema = Yup.object({
  text: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  select: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
  checkbox: Yup.boolean().oneOf([true], 'Must accept terms'),
  file: Yup.mixed().required('File is required'),
  slider: Yup.number().min(10, 'At least 10'),
});

const ExampleForm = () => (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={console.log}>
    <Form>
      <Text label="Text" name="text" />
      <Password label="Password" name="password" />
      <Select label="Select" name="select" options={[{ value: '1', label: 'One' }]} />
      <Checkbox label="Accept Terms" name="checkbox" />
      <FileUpload label="Upload File" name="file" />
      <Slider label="Volume" name="slider" min={0} max={100} step={0} />
      <Button type="submit" variant="contained">Submit</Button>
    </Form>
  </Formik>
);

export default ExampleForm;
