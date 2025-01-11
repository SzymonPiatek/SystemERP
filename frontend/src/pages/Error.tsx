import { useRouteError, Link } from 'react-router-dom';
import { Box, Text, Heading, Button, Center, Image } from '@chakra-ui/react';
import { FC } from 'react';

interface RouteError {
  status?: number;
  message?: string;
}

export const Error: FC = () => {
  const error = useRouteError() as RouteError;
  console.log(error);

  if (!error) {
    return (
      <Center height="100vh" flexDirection="column" px={8}>
        <Box textAlign="center">
          <Image src="../../../public/404.svg" alt="404"></Image>
          <Heading
            mt={4}
            fontSize={{ base: '3xl', sm: '5xl' }}
            fontWeight="bold"
            textTransform="uppercase"
          >
            Page Not Found
          </Heading>
          <Text mt={6} fontSize="lg">
            Sorry, we couldn’t find the page you’re looking for.
          </Text>
          <Box mt={10}>
            <Link to="/">
              <Button colorScheme="teal" variant="outline">
                Go Back Home
              </Button>
            </Link>
          </Box>
        </Box>
      </Center>
    );
  }

  return (
    <Center height="100vh" flexDirection="column" px={8}>
      <Heading fontSize="4xl" fontWeight="bold">
        There was an error...
      </Heading>
      <Text mt={6} fontSize="lg">
        {error?.message || 'An unexpected error occurred.'}
      </Text>
    </Center>
  );
};
