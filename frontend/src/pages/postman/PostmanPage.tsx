import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ClientFormWrapper from '../../components/form/formWrapper/ClientFormWrapper.tsx';
import CustomSelect from '../../components/select/CustomSelect.tsx';
import CustomButton from '../../components/button/CustomButton.tsx';
import CustomInput from '../../components/input/CustomInput.tsx';

const methodVariants = [
  { name: 'GET', color: 'green' },
  { name: 'POST', color: 'orange' },
  { name: 'PATCH', color: '#6b03fc' },
  { name: 'DELETE', color: 'red' },
];

const methodCollection = methodVariants.flatMap((method) => ({
  label: method.name,
  value: method.name,
}));

type ResponseListProps = {
  displayName: string;
  method: string;
  url: string;
};

const responseList: ResponseListProps[] = [
  { displayName: 'Get users', method: 'GET', url: 'http://localhost/api/v1/users' },
  { displayName: 'Login', method: 'PATCH', url: 'http://localhost/api/v1/auth/login' },
];

const PostmanPage: FC<{}> = () => {
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleOnSubmit = async () => {
    console.log(selectedMethod);
    console.log(selectedUrl);
  };

  const handleApplyResponseSettings = async (response: ResponseListProps) => {
    setSelectedMethod(response.method);
    setSelectedUrl(response.url);
  };

  const getButtonColor = (method: string) => {
    const variant = methodVariants.find((variant) => variant.name === method);
    return variant?.color || 'gray';
  };

  return (
    <Box bg="#262626" minH="100vh" padding="2rem" display="flex" gap="1rem">
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
      <Box flex="1">
        <ClientFormWrapper onSubmit={handleOnSubmit}>
          <Box display="flex" gap="1rem" alignItems="end">
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
