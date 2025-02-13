import { Box, Button, Card, Text, Flex } from '@chakra-ui/react';
import { Logo } from '../components/logo/Logo';

function AcceptInvitePage() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      bgGradient="to-r"
      gradientFrom="black"
      gradientTo="red.700"
    >
      <Card.Root width="xl" p={6} textAlign="center">
        <Card.Body>
          <Logo />
          <Text mt={4}>Welcome</Text>
          <Button variant="outline" mt={4}>
            Accept Invite
          </Button>
        </Card.Body>
      </Card.Root>
    </Flex>
  );
}

export default AcceptInvitePage;
