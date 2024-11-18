import { Box, Stack, Flex, Link, VStack } from "@chakra-ui/react";
import { NavLink as NL, Link as L } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

import { NavLink } from "./sidebarLayout/NavLink";
import { NavGroup } from "./sidebarLayout/NavGroup";
import { Navbar } from "./Navbar";

const Sidebar = () => {
  return (
    <Flex background="gray.100" p={0} minH="100vh">
      <Stack
        as="aside"
        height="full"
        background="white"
        minWidth={[null, "15%", "13%"]}
        maxWidth={[null, "15%", "13%"]}
        maxH="100vh"
        position="sticky"
        left="0"
        top="0"
      >
        <Box px={8} py={5}>
          <Link as={L}>
            <BrandLogo />
          </Link>
        </Box>
        <Stack as="nav" height="full" overflowY="auto">
          <Box px={4} pb={8}></Box>
        </Stack>
      </Stack>
      <VStack w="full">
        <Navbar
          Restaurants={["Aktualna", "druga", "trzecia"]}
          Start={630}
          End={1310}
        />

        <Box flex={1} pl={8} w="full">
          <Box></Box>
        </Box>
      </VStack>
    </Flex>
  );
};
export default Sidebar;
