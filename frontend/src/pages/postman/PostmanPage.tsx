import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import CustomSelect from '../../components/select/CustomSelect.tsx';
import CustomButton from '../../components/button/CustomButton.tsx';
import CustomInput from '../../components/input/CustomInput.tsx';
import { methodCollection } from '../../lib/postmanData.ts';
import ResponseList from '../../components/postman/ResponseList.tsx';
import PostmanSidebar from '../../components/postman/PostmanSidebar.tsx';
import EnvironmentList from '../../components/postman/EnvironmentList.tsx';

const PostmanPage: FC<{}> = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedUrl, setSelectedUrl] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('collections');
  const [activeResponseSection, setActiveResponseSection] = useState<string>('queryParams');
  const [environmentData, setEnvironmentData] = useState<Record<string, string>>({});

  const handleOnSubmit = async () => {
    console.log(selectedMethod);
    console.log(selectedUrl);
  };

  return (
    <Box bg="#222222" minH="100vh" display="flex" gap="1rem">
      <PostmanSidebar setActiveSection={setActiveSection} activeSection={activeSection} />

      {activeSection === 'collections' && (
        <ResponseList setSelectedMethod={setSelectedMethod} setSelectedUrl={setSelectedUrl} />
      )}

      {activeSection === 'environments' && (
        <EnvironmentList
          setEnvironmentData={setEnvironmentData}
          environmentData={environmentData}
        />
      )}

      <Box display="flex" flexDirection="column" flex="1" padding="1rem" bg="#333333" gap="1rem">
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
              placeholder="http://localhost/api/v1"
            />
            <CustomButton type="submit">Send</CustomButton>
          </Box>
        </ClientFormWrapper>
        <Box display="flex" flexDirection="column" gap="1rem">
          <Box display="flex" justifyContent="start" gap="1rem">
            <CustomButton
              variant={activeResponseSection === 'queryParams' ? 'primary' : 'outline'}
              onClick={() => setActiveResponseSection('queryParams')}
            >
              Query Params
            </CustomButton>
            <CustomButton
              variant={activeResponseSection === 'headers' ? 'primary' : 'outline'}
              onClick={() => setActiveResponseSection('headers')}
            >
              Headers
            </CustomButton>
            <CustomButton
              variant={activeResponseSection === 'json' ? 'primary' : 'outline'}
              onClick={() => setActiveResponseSection('json')}
            >
              JSON
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostmanPage;
