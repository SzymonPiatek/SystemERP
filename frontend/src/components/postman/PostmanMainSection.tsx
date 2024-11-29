import { Box } from '@chakra-ui/react';
import ClientFormWrapper from '../form/formWrapper/ClientFormWrapper.tsx';
import CustomSelect from '../select/CustomSelect.tsx';
import { methodCollection } from '../../lib/postmanData.ts';
import CustomInput from '../input/CustomInput.tsx';
import CustomButton from '../button/CustomButton.tsx';
import React from 'react';

type PostmanMainSectionProps = {
  handleOnSubmit: () => Promise<void>;
  setSelectedMethod: (section: string) => void;
  selectedUrl: string;
  setSelectedUrl: (section: string) => void;
  activeResponseSection: string;
  setActiveResponseSection: (section: string) => void;
};

const PostmanMainSection: React.FC<PostmanMainSectionProps> = ({
  handleOnSubmit,
  setSelectedMethod,
  selectedUrl,
  setSelectedUrl,
  activeResponseSection,
  setActiveResponseSection,
}) => {
  return (
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
