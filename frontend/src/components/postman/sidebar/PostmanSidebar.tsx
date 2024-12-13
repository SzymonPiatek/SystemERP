import React from 'react';
import CustomButton from '../../button/CustomButton.tsx';
import { Box } from '@chakra-ui/react';

type PostmanSidebarProps = {
  setActiveSection: (section: string) => void;
  activeSection: string;
  setActiveMainSection: (value: string) => void;
};

const PostmanSidebar: React.FC<PostmanSidebarProps> = ({
  setActiveSection,
  activeSection,
  setActiveMainSection,
}) => {
  const handleCollectionButton = async () => {
    setActiveSection('collections');
    setActiveMainSection('response');
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1rem"
      height="100dvh"
      padding="1rem"
      bg="#111111"
      width="12rem"
    >
      <CustomButton
        onClick={handleCollectionButton}
        variant={activeSection === 'collections' ? 'primary' : 'outline'}
      >
        Collections
      </CustomButton>
      <CustomButton
        onClick={() => setActiveSection('environments')}
        variant={activeSection === 'environments' ? 'primary' : 'outline'}
      >
        Environments
      </CustomButton>
    </Box>
  );
};

export default PostmanSidebar;
