import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import CustomSelect from '../../components/select/CustomSelect.tsx';
import CustomButton from '../../components/button/CustomButton.tsx';
import CustomInput from '../../components/input/CustomInput.tsx';
import { methodCollection } from '../../lib/postmanData.ts';
import ResponseList from '../../components/postman/ResponseList.tsx';

const PostmanPage: FC<{}> = () => {
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleOnSubmit = async () => {
    console.log(selectedMethod);
    console.log(selectedUrl);
  };

  return (
    <Box bg="#262626" minH="100vh" padding="2rem" display="flex" gap="1rem">
      <ResponseList setSelectedMethod={setSelectedMethod} setSelectedUrl={setSelectedUrl} />

      <Box flex="1">
        <ClientFormWrapper onSubmit={handleOnSubmit}>
          <Box display="flex" gap="1rem" alignItems="end">
            <CustomSelect
              collection={methodCollection}
              placeholder="Method"
              stackStyle={{ width: '8rem' }}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            <CustomInput
              value={selectedUrl}
              onChange={(newValue) => setSelectedUrl(newValue as string)}
              style={{ borderColor: 'black', background: 'white' }}
            />
            <CustomButton type="submit">Send</CustomButton>
          </Box>
        </ClientFormWrapper>
      </Box>
    </Box>
  );
};

export default PostmanPage;
