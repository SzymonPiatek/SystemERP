import { Box, Flex, Image, Text, Icon } from '@chakra-ui/react';
import { FC } from 'react';

export const CardBox: FC = () => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="blue.50"
      p={4}
      boxShadow="md"
    >
      {/* Górna sekcja z obrazkiem i imieniem */}
      <Flex align="center" mb={4}>
        <Image
          borderRadius="full"
          boxSize="60px"
          src="https://via.placeholder.com/60"
          alt="Leonard Snyder"
          mr={4}
        />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Leonard Snyder
          </Text>
          <Text fontSize="sm" color="gray.500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </Text>
        </Box>
      </Flex>

      {/* Sekcja danych */}
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Text fontSize="sm">user@gmail.com</Text>
        </Flex>
      </Flex>

      {/* Sekcja dolna */}
      <Flex justify="space-between" align="center" mt={4}>
        <Text fontSize="sm" color="blue.500">
          A+
        </Text>
        <Text fontSize="sm" color="gray.500">
          January 2025
        </Text>
      </Flex>
    </Box>
  );
};
