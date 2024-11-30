import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

export type TextWithIconProps = { title: string; Icon: React.ElementType };

export const TextWithIcon: FC<TextWithIconProps> = (props) => {
  const { title, Icon } = props;

  return (
    <Flex gap="2">
      {Icon && <Icon />} <Text hideBelow="lg">{title}</Text>
    </Flex>
  );
};
