import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink as NL } from 'react-router-dom';

export type NavLinkProps = { to: string } & ButtonProps;

export const NavLink: FC<NavLinkProps> = (props) => {
  const { to, ...buttonProps } = props;

  const baseProps: ButtonProps = {
    borderRadius: 'md',
    variant: 'ghost',
    width: 'full',
    justifyContent: 'flex-start',
    as: 'span',
    fontWeight: '500',
    size: 'sm',
    ...buttonProps,
  };

  return (
    <NL to={to} end>
      {({ isActive }) => {
        return (
          <Button
            {...baseProps}
            color={isActive ? 'green.700' : 'gray.500'}
            bg={isActive ? 'green.50' : 'white'}
            _hover={{
              color: 'gray.700',
            }}
            justifyContent={{ base: 'center', lg: 'left' }}
          />
        );
      }}
    </NL>
  );
};
