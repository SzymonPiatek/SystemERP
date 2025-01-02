import { FC, ReactNode, useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';

type BoxProps = {
  Title?: string;
  Text?: string;
  Action?: ReactNode;
};

export const BoxWithTitle: FC<BoxProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedText =
    props.Text && props.Text.length > 300 ? `${props.Text.slice(0, 300)}...` : props.Text;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Flex pb="4" justify="space-between" align="start" wrap="wrap">
      <Box flex="1" minWidth="0">
        <Box mt="1" lineHeight="tight" fontSize="xl">
          {props.Title}
        </Box>
        <Box
          as="span"
          color="gray.600"
          fontSize="sm"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace={isExpanded ? 'normal' : 'nowrap'}
          display="block"
        >
          {isExpanded ? props.Text : truncatedText}
        </Box>
        {props.Text && props.Text.length > 200 && (
          <Button mt="2" onClick={handleToggleExpand} variant="plain">
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </Box>

      <Box>{props.Action}</Box>
    </Flex>
  );
};
