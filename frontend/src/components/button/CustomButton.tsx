import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

type CustomButtonProps = ButtonProps;

const CustomButton: React.FC<CustomButtonProps> = ({ value, onChange, _focus, ...props }) => {
  return (
    <Button
      {...props}
      marginTop="1rem"
      color="white"
      bg="green.600"
      _hover={{
        bg: 'green.700',
      }}
      paddingLeft="8"
      paddingRight="8"
    />
  );
};

export default CustomButton;
