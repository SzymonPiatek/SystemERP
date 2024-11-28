import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

type CustomButtonProps = ButtonProps & {
  variant?: 'primary' | 'outline';
};

const CustomButton: React.FC<CustomButtonProps> = ({ variant = 'primary', ...props }) => {
  const styles =
    variant === 'primary'
      ? {
          bg: 'green.600',
          color: 'white',
          _hover: {
            bg: 'green.700',
          },
        }
      : {
          bg: 'transparent',
          color: 'green.600',
          border: '2px solid',
          borderColor: 'green.600',
          _hover: {
            bg: 'green.600',
            color: 'white',
          },
        };

  return <Button {...props} {...styles} paddingLeft="8" paddingRight="8" />;
};

export default CustomButton;
