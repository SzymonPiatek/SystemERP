import { Box } from '@chakra-ui/react';
import { FC, useState } from 'react';
import ResponseList from '../../components/postman/ResponseList.tsx';
import PostmanSidebar from '../../components/postman/PostmanSidebar.tsx';
import EnvironmentList from '../../components/postman/EnvironmentList.tsx';
import PostmanMainSection from '../../components/postman/PostmanMainSection.tsx';

const PostmanPage: FC<{}> = () => {
  // Layout
  const [activeSection, setActiveSection] = useState<string>('collections');
  const [activeResponseSection, setActiveResponseSection] = useState<string>('params');

  // Environment
  const [activeEnvironment, setActiveEnvironment] = useState<string>('');

  // Collection
  const [activeResponse, setActiveResponse] = useState<string>('');

  return (
    <Box bg="#222222" minH="100vh" display="flex" gap="1rem">
      <PostmanSidebar setActiveSection={setActiveSection} activeSection={activeSection} />

      {activeSection === 'collections' && (
        <ResponseList setActiveResponse={setActiveResponse} activeResponse={activeResponse} />
      )}

      {activeSection === 'environments' && (
        <EnvironmentList
          setActiveEnvironment={setActiveEnvironment}
          activeEnvironment={activeEnvironment}
        />
      )}

      <PostmanMainSection
        activeResponseSection={activeResponseSection}
        setActiveResponseSection={setActiveResponseSection}
        activeResponse={activeResponse}
        activeEnvironment={activeEnvironment}
      />
    </Box>
  );
};

export default PostmanPage;
