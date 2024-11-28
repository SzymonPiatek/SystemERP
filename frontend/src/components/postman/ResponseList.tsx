import React from 'react';
import { Box } from '@chakra-ui/react';
import { methodVariants, responseList, ResponseListDataProps } from '../../lib/postmanData.ts';
import CustomButton from '../button/CustomButton.tsx';

type ResponseListProps = {
  setSelectedMethod: (method: string) => void;
  setSelectedUrl: (url: string) => void;
};

export const ResponseList: React.FC<ResponseListProps> = ({
  setSelectedMethod,
  setSelectedUrl,
}) => {
  const handleApplyResponseSettings = async (response: ResponseListDataProps) => {
    setSelectedMethod(response.method);
    setSelectedUrl(response.url);
  };

  const getButtonColor = (method: string) => {
    const variant = methodVariants.find((variant) => variant.name === method);
    return variant?.color || 'gray';
  };

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      {responseList.map((response) => (
        <CustomButton
          key={response.url}
          onClick={() => handleApplyResponseSettings(response)}
          variant="outline"
          style={{
            color: 'white',
            padding: '0 0.5rem',
          }}
        >
          <Box display="grid" gridTemplateColumns="auto 1fr" flex="1">
            <Box
              bg={getButtonColor(response.method)}
              padding="0 1rem"
              textAlign="center"
              width="5rem"
              borderRadius="1rem"
            >
              {response.method}
            </Box>
            <Box textAlign="start" padding="0 1rem">
              {response.displayName}
            </Box>
          </Box>
        </CustomButton>
      ))}
    </Box>
  );
};

export default ResponseList;
