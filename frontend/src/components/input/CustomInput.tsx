import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';

type CustomInputProps = InputProps & {
  value?: string | number;
  onChange?: (value: string | number) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({ value, onChange, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      color="black"
      _focus={{
        borderColor: 'black',
        borderWidth: '2px',
      }}
    />
  );
};

export default CustomInput;
