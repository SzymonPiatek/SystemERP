import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ResponseList from '../../components/postman/ResponseList.tsx';
import PostmanSidebar from '../../components/postman/PostmanSidebar.tsx';
import EnvironmentList from '../../components/postman/EnvironmentList.tsx';
import PostmanMainSection from '../../components/postman/PostmanMainSection.tsx';

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

      <PostmanMainSection
        handleOnSubmit={handleOnSubmit}
        setSelectedMethod={setSelectedMethod}
        selectedUrl={selectedUrl}
        setSelectedUrl={setSelectedUrl}
        activeResponseSection={activeResponseSection}
        setActiveResponseSection={setActiveResponseSection}
      />
    </Box>
  );
};

export default PostmanPage;
