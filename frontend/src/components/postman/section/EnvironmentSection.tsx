import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import CustomButton from '../../button/CustomButton.tsx';
import CustomInput from '../../input/CustomInput.tsx';

type EnvironmentSectionProps = {
  setEnvironmentData: (data: Record<string, string>) => void;
  environmentData: Record<string, string>;
};

const EnvironmentSection: React.FC<EnvironmentSectionProps> = ({
  setEnvironmentData,
  environmentData,
}) => {
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [environment, setEnvironment] = useState<Record<string, string>>(environmentData);

  const handleAddPair = () => {
    if (key.trim() && value.trim()) {
      const updatedEnvironment = { ...environment, [key]: value };
      setEnvironment(updatedEnvironment);
      setEnvironmentData(updatedEnvironment);
      setKey('');
      setValue('');
    }
  };

  const handleDeletePair = (keyToDelete: string) => {
    const { [keyToDelete]: _, ...updatedEnvironment } = environment;
    setEnvironment(updatedEnvironment);
    setEnvironmentData(updatedEnvironment);
  };

  return (
    <Box display="flex" flexDirection="column" flex="1" padding="1rem" bg="#333333" gap="1rem">
      <Box display="flex" gap="1rem">
        <CustomInput
          placeholder="Key"
          value={key}
          onChange={(value) => setKey(value as string)}
          style={{ borderColor: 'white', color: 'white' }}
        />
        <CustomInput
          placeholder="Value"
          value={value}
          onChange={(value) => setValue(value as string)}
          style={{ borderColor: 'white', color: 'white' }}
        />
        <CustomButton onClick={handleAddPair} variant="primary">
          Add
        </CustomButton>
      </Box>

      <Box>
        {Object.entries(environment).map(([envKey, envValue]) => (
          <Flex
            key={envKey}
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid gray"
            padding="0.5rem"
          >
            <Box display="flex" flexDirection="column">
              <Text fontWeight="bold">{envKey}</Text>
              <Text color="gray.400">{envValue}</Text>
            </Box>
            <CustomButton onClick={() => handleDeletePair(envKey)}>Delete</CustomButton>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default EnvironmentSection;
