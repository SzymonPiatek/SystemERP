import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import CustomSelect from '../../components/select/CustomSelect.tsx';

const PostmanPage: FC<{}> = () => {
  const methodCollection = [
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PATCH', value: 'PATCH' },
    { label: 'DELETE', value: 'DELETE' },
  ];

  const handleOnSubmit = async () => {
    console.log('Submit');
  };

  return (
    <Box bg="#262626" minH="100vh" padding="2rem">
      <ClientFormWrapper onSubmit={handleOnSubmit}>
        <Box display="flex" gap="1rem">
          <CustomSelect
            collection={methodCollection}
            placeholder="Method"
            label="Method"
            stackStyle={{ width: '8rem' }}
          />
        </Box>
      </ClientFormWrapper>
    </Box>
  );
};

export default PostmanPage;
