import { Box, Button, Flex } from "@chakra-ui/react";

const Panel = () => {
  return (
    <Box bg="gray.100" overflow="hidden">
      <Box h="320px" bg="white" m="4" rounded="xl">
        <Button>Tu będzie kalendarz kiedyś</Button>
      </Box>
      <Box h="320px" bg="white" m="4" rounded="xl">
        <Button>Tu będzie kalendarz kiedyś</Button>
      </Box>
      <Flex justify="space-between">
        <Box h="320px" w="40vw" bg="white" m="4" rounded="xl">
          <Button>Tu notatki chyba</Button>
        </Box>
        <Box h="320px" w="40vw" bg="white" m="4" rounded="xl">
          <Button>Tu coś</Button>
        </Box>
        <Box h="320px" w="40vw" bg="white" m="4" rounded="xl">
          <Button>Tu coś</Button>
        </Box>
      </Flex>
    </Box>
  );
};
export default Panel;
