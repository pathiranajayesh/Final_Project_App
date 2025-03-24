import React from 'react';
import { Slider as MUISlider, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';

interface SliderProps {
  label: string;
  sx?: object;
  min: number;
  max: number;
  step: number;
  [key: string]: any;
}

const Slider: React.FC<SliderProps> = ({ label, sx = {}, min, max, step, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ ...props, name: props.name });

  const handleChange = (_: any, value: any) => {
    setFieldValue(field.name, value);
  };

  return (
    <div style={{ marginBottom: 16, ...sx }}>
      <Typography gutterBottom>{label}</Typography>
      <MUISlider
        {...props}
        value={field.value || min}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default Slider;
