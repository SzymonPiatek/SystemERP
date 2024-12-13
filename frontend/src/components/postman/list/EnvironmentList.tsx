import React from 'react';
import { Box } from '@chakra-ui/react';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { environmentList, EnvironmentListDataProps } from '../../../lib/postmanData.ts';

type EnvironmentListProps = {
  setActiveEnvironment: (value: string) => void;
  activeEnvironment: string;
  setActiveMainSection: (value: string) => void;
};

const EnvironmentList: React.FC<EnvironmentListProps> = ({
  setActiveEnvironment,
  activeEnvironment,
  setActiveMainSection,
}) => {
  const handleOnClick = async (value: string) => {
    setActiveEnvironment(value);
  };

  const handleChangeMainSection = async () => {
    setActiveMainSection('environment');
  };

  return (
    <Box display="flex" flexDirection="column" gap="1rem" width="20rem" padding="1rem 0">
      {environmentList.map((env: EnvironmentListDataProps, index) => {
        const envName = Object.keys(env)[0];

        return (
          <Box
            onClick={() => handleOnClick(envName)}
            key={index}
            border="1px solid"
            bg={activeEnvironment === envName ? 'green.600' : 'transparent'}
            borderColor="green.600"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            rounded="lg"
            padding="0.5rem 1rem"
          >
            <Box>{envName}</Box>
            <Box
              h="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="2rem"
              onClick={handleChangeMainSection}
            >
              <IoMdArrowDroprightCircle />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default EnvironmentList;
