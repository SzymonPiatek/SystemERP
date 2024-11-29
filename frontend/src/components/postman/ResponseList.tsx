import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import {
  fullApiUrl,
  methodVariants,
  responseList,
  ResponseListDataProps,
} from '../../lib/postmanData.ts';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '../ui/accordion.tsx';

type ResponseListProps = {
  setSelectedMethod: (method: string) => void;
  setSelectedUrl: (url: string) => void;
};

const ResponseList: React.FC<ResponseListProps> = ({ setSelectedMethod, setSelectedUrl }) => {
  const groupedResponses = responseList.reduce(
    (acc, response) => {
      if (!acc[response.tag]) acc[response.tag] = [];
      acc[response.tag].push(response);
      return acc;
    },
    {} as Record<string, ResponseListDataProps[]>,
  );

  const handleApplyResponseSettings = (response: ResponseListDataProps) => {
    setSelectedMethod(response.method);
    setSelectedUrl(response.url);
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
        {Object.entries(groupedResponses).map(([tag, responses]) => (
          <AccordionItem key={tag} value={tag}>
            <AccordionItemTrigger>
              <Box fontWeight="bold" fontSize="lg" textTransform="capitalize">
                {tag}
              </Box>
            </AccordionItemTrigger>
            <AccordionItemContent display="flex" flexDirection="column" gap="0.5rem">
              {responses.map((response) => (
                <Box
                  key={response.url}
                  display="grid"
                  gridTemplateColumns="auto 1fr"
                  gap="1rem"
                  alignItems="center"
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleApplyResponseSettings(response)}
                >
                  <Box
                    bg={getButtonColor(response.method)}
                    color="white"
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
        ))}
      </AccordionRoot>
    </Box>
  );
};

export default ResponseList;
