import { Box } from '@chakra-ui/react';
import ClientFormWrapper from '../form/formWrapper/ClientFormWrapper.tsx';
import PostmanSelect from './PostmanSelect.tsx';
import { environmentList, responseList } from '../../lib/postmanData.ts';
import CustomInput from '../input/CustomInput.tsx';
import CustomButton from '../button/CustomButton.tsx';
import React, { useEffect, useState } from 'react';

type PostmanMainSectionProps = {
  activeEnvironment: string;
  activeResponse: string;
  activeResponseSection: string;
  setActiveResponseSection: (section: string) => void;
};

const getActiveResponseData = async (response: string) => {
  for (const group of responseList) {
    for (const groupName in group) {
      const responses = group[groupName];
      const foundResponse = responses.find((res) => res.displayName === response);
      if (foundResponse) {
        return foundResponse;
      }
    }
  }
  return null;
};

const getActiveEnvironmentData = async (environment: string) => {
  for (const group of environmentList) {
    for (const envKey in group) {
      if (envKey === environment) {
        return group[envKey];
      }
    }
  }
  return null;
};
const PostmanMainSection: React.FC<PostmanMainSectionProps> = ({
  activeEnvironment,
  activeResponse,
  activeResponseSection,
  setActiveResponseSection,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('GET');
  const [selectedUrl, setSelectedUrl] = useState<string>('');

  useEffect(() => {
    const fetchResponseData = async () => {
      if (activeResponse) {
        const data = await getActiveResponseData(activeResponse);
        setSelectedUrl(data?.url ?? '');
        setSelectedMethod(data?.method ?? '');
      }
    };

    const fetchEnvironmentData = async () => {
      if (activeEnvironment) {
        await getActiveEnvironmentData(activeEnvironment);
      }
    };

    fetchResponseData();
    fetchEnvironmentData();
  }, [activeResponse, activeEnvironment]);

  const handleOnSubmit = async () => {
    console.log(selectedMethod);
    console.log(selectedUrl);
    console.log(activeResponse);
    console.log(activeEnvironment);
  };

  return (
    <Box display="flex" flexDirection="column" flex="1" padding="1rem" bg="#333333" gap="1rem">
      <ClientFormWrapper onSubmit={handleOnSubmit}>
        <Box display="flex" gap="1rem">
          <PostmanSelect
            placeholder="Method"
            defaultValue={[selectedMethod]}
            value={[selectedMethod]}
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
            variant={activeResponseSection === 'params' ? 'primary' : 'outline'}
            onClick={() => setActiveResponseSection('params')}
          >
            Params
          </CustomButton>
          <CustomButton
            variant={activeResponseSection === 'headers' ? 'primary' : 'outline'}
            onClick={() => setActiveResponseSection('headers')}
          >
            Headers
          </CustomButton>
          <CustomButton
            variant={activeResponseSection === 'body' ? 'primary' : 'outline'}
            onClick={() => setActiveResponseSection('body')}
          >
            Body
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PostmanMainSection;
