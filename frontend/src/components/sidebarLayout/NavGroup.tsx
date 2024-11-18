import { FC, PropsWithChildren, useState, memo } from "react";
import { Button, ButtonProps, Box, Icon, Text } from "@chakra-ui/react";
import { BiChevronLeft, BiChevronDown } from "react-icons/bi";

export type NavGroupProps = PropsWithChildren<{
  title: string;
}>;

const NavGroupRaw: FC<NavGroupProps> = (props) => {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const baseProps: ButtonProps = {
    borderRadius: "md",
    variant: "ghost",
    width: "full",
    justifyContent: "flex-start",
    as: "span",
    fontWeight: "500",
  };

  return (
    <Box
      my="3"
      py="3"
      borderBottom="1px solid"
      borderColor="gray.100"
      _last={{ borderBottom: "none" }}
    >
      <Button
        {...baseProps}
        color="gray.500"
        cursor="pointer"
        display="flex"
        justifyContent="space-between"
        onClick={toggle}
      >
        <Text>{title}</Text>
        <Icon as={isOpen ? BiChevronDown : BiChevronLeft} fontSize="2xl" />
      </Button>
      {isOpen && <Box pl="4">{children}</Box>}
    </Box>
  );
};
export const NavGroup = memo(NavGroupRaw);
