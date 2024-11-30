import React from 'react';
import { Box } from '@chakra-ui/react';
import { environmentList, EnvironmentListDataProps } from '../../../lib/postmanData.ts';
import CustomButton from '../../button/CustomButton.tsx';

type EnvironmentListProps = {
  setActiveEnvironment: (value: string) => void;
  activeEnvironment: string;
};

const EnvironmentList: React.FC<EnvironmentListProps> = ({
  setActiveEnvironment,
  activeEnvironment,
}) => {
  const handleOnClick = async (value: string) => {
    setActiveEnvironment(value);
  };

  return (
    <Box display="flex" flexDirection="column" gap="1rem" width="20rem" padding="1rem 0">
      {environmentList.map((env: EnvironmentListDataProps, index) => {
        const envName = Object.keys(env)[0];

        return (
          <CustomButton
            variant={activeEnvironment === envName ? 'primary' : 'outline'}
            onClick={() => handleOnClick(envName)}
            key={index}
          >
            {envName}
          </CustomButton>
        );
      })}
    </Box>
  );
};

export default EnvironmentList;
