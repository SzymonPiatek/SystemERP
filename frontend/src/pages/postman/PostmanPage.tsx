import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';

const PostmanPage: FC<{}> = () => {
  const handleOnSubmit = async () => {
    console.log('Submit');
  };

  return (
    <Box bg="#262626" minH="100vh" padding="2rem">
      <ClientFormWrapper onSubmit={handleOnSubmit}>
        <Box>Postman</Box>
      </ClientFormWrapper>
    </Box>
  );
};

export default PostmanPage;
