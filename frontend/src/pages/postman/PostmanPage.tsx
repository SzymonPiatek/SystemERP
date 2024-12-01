import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ResponseList from '../../components/postman/list/ResponseList.tsx';
import PostmanSidebar from '../../components/postman/sidebar/PostmanSidebar.tsx';
import EnvironmentList from '../../components/postman/list/EnvironmentList.tsx';
import PostmanMainSection from '../../components/postman/section/PostmanMainSection.tsx';
import EnvironmentSection from '../../components/postman/section/EnvironmentSection.tsx';

const PostmanPage: FC<{}> = () => {
  // Layout
  const [activeSection, setActiveSection] = useState<string>('collections');
  const [activeResponseSection, setActiveResponseSection] = useState<string>('params');
  const [activeMainSection, setActiveMainSection] = useState<string>('response');

  // Environment
  const [activeEnvironment, setActiveEnvironment] = useState<string>('admin');
  const [environmentData, setEnvironmentData] = useState<Record<string, string>>({});

  // Collection
  const [activeResponse, setActiveResponse] = useState<string>('Login');

  return (
    <Box bg="#222222" minH="100vh" display="flex" gap="1rem">
      <PostmanSidebar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        setActiveMainSection={setActiveMainSection}
      />

      {activeSection === 'collections' && (
        <ResponseList setActiveResponse={setActiveResponse} activeResponse={activeResponse} />
      )}

      {activeSection === 'environments' && (
        <EnvironmentList
          setActiveEnvironment={setActiveEnvironment}
          activeEnvironment={activeEnvironment}
          setActiveMainSection={setActiveMainSection}
        />
      )}

      {activeMainSection === 'response' && (
        <PostmanMainSection
          activeResponseSection={activeResponseSection}
          setActiveResponseSection={setActiveResponseSection}
          activeResponse={activeResponse}
          activeEnvironment={activeEnvironment}
        />
      )}

      {activeMainSection === 'environment' && (
        <EnvironmentSection
          setEnvironmentData={setEnvironmentData}
          environmentData={environmentData}
        />
      )}
    </Box>
  );
};

export default PostmanPage;
