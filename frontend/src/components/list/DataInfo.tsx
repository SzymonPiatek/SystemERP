import { Flex, Text } from '@chakra-ui/react';

const DataInfo = () => {
  return (
    <Flex
      color="black"
      alignItems="center"
      paddingInline="50px"
      justifyContent="space-between"
      flex="1"
      gap="1rem"
    >
      <Text height="10">numer</Text>
      <Text height="10">telefon</Text>
      <Text height="10">adres</Text>
    </Flex>
  );
};
export default DataInfo;
