import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import CustomSelect from '../../components/select/CustomSelect.tsx';
import CustomButton from '../../components/button/CustomButton.tsx';
import CustomInput from '../../components/input/CustomInput.tsx';
import { methodCollection } from '../../lib/postmanData.ts';
import ResponseList from '../../components/postman/ResponseList.tsx';

const PostmanPage: FC<{}> = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('GET');
  const [selectedUrl, setSelectedUrl] = useState<string>('http://localhost/api/v1');
  const [activeSection, setActiveSection] = useState<string>('collections');

  const handleOnSubmit = async () => {
    console.log(selectedMethod);
    console.log(selectedUrl);
  };

  return (
    <Box bg="#222222" minH="100vh" display="flex" gap="1rem">
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        height="100dvh"
        padding="1rem"
        bg="#111111"
      >
        <CustomButton onClick={() => setActiveSection('collections')}>Collections</CustomButton>
        <CustomButton onClick={() => setActiveSection('environments')}>Environments</CustomButton>
      </Box>

      {activeSection === 'collections' && (
        <ResponseList setSelectedMethod={setSelectedMethod} setSelectedUrl={setSelectedUrl} />
      )}

      <Box flex="1" padding="1rem" bg="#333333">
        <ClientFormWrapper onSubmit={handleOnSubmit}>
          <Box display="flex" gap="1rem">
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
