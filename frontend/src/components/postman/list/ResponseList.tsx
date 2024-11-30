import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { fullApiUrl, methodVariants, responseList } from '../../../lib/postmanData.ts';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '../../ui/accordion.tsx';

type ResponseListProps = {
  setActiveResponse: (value: string) => void;
  activeResponse: string;
};

const ResponseList: React.FC<ResponseListProps> = ({ setActiveResponse, activeResponse }) => {
  const handleOnClick = (displayName: string) => {
    setActiveResponse(displayName);
  };

  const getButtonColor = (method: string) => {
    const variant = methodVariants.find((variant) => variant.name === method);
    return variant?.color || 'gray';
  };

  const trimBaseUrl = (url: string) => {
    return url.startsWith(fullApiUrl) ? url.slice(fullApiUrl.length) : url;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1rem"
      width="20rem"
      height="100dvh"
      overflowY="auto"
      padding="1rem"
    >
      <AccordionRoot collapsible defaultValue={['']}>
        {responseList.map((responseGroup) =>
          Object.entries(responseGroup).map(([groupName, responses]) => (
            <AccordionItem key={groupName} value={groupName}>
              <AccordionItemTrigger>
                <Box fontWeight="bold" fontSize="lg" textTransform="capitalize">
                  {groupName}
                </Box>
              </AccordionItemTrigger>
              <AccordionItemContent display="flex" flexDirection="column" gap="0.5rem">
                {responses.map((response) => (
                  <Box
                    key={response.displayName}
                    display="grid"
                    gridTemplateColumns="auto 1fr"
                    gap="1rem"
                    alignItems="center"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => handleOnClick(response.displayName)}
                  >
                    <Box
                      bg={
                        activeResponse === response.displayName
                          ? getButtonColor(response.method)
                          : 'transparent'
                      }
                      color={
                        activeResponse === response.displayName
                          ? 'white'
                          : getButtonColor(response.method)
                      }
                      border={
                        activeResponse === response.displayName
                          ? 'none'
                          : `1px solid ${getButtonColor(response.method)}`
                      }
                      fontWeight="bold"
                      width="5rem"
                      textAlign="center"
                      borderRadius="md"
                      padding="0.25rem 0"
                    >
                      {response.method}
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <Text fontWeight="bold">{response.displayName}</Text>
                      <Text fontSize="sm" color="gray.400">
                        {trimBaseUrl(response.url)}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </AccordionItemContent>
            </AccordionItem>
          )),
        )}
      </AccordionRoot>
    </Box>
  );
};

export default ResponseList;
