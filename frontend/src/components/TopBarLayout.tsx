import {  Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Avatar } from "../components/ui/avatar"

import { MdOutlineAnnouncement,MdSettings, MdPerson  } from "react-icons/md";



type TopBarProps = {
    
  };

export const TopBarLayout: FC<TopBarProps> = (props) => {
return(
    <Flex justify="space-between" p="4" align="center" bg="white" color="black" width="full">
      {/* NOTES */}
      <Flex align="center" gap="1">
        <Box bg="red.600" h="4" w="4" rounded="full"></Box>
        <Text textStyle="xs">2</Text>
        <Box bg="yellow.600" h="4" w="4" rounded="full"></Box>
        <Text textStyle="xs">12</Text>
        <Box bg="green.600" h="4" w="4" rounded="full"></Box>
        <Text textStyle="xs">5</Text>
      </Flex>
      {/* ICONS AND USER */}
      <Flex align="center" gap="6">
        <Box>
          <IconButton size="xs" >
            <MdOutlineAnnouncement />
          </IconButton>
          <IconButton size="xs" >
            <MdSettings />
          </IconButton>
          <IconButton size="xs" >
            <MdPerson />
          </IconButton>
        </Box>
        <Flex direction="column">
         <Text textStyle="sm">John Doe</Text>
         <Text textStyle="xs" color="gray.500">Admin</Text>
        </Flex>
        <Avatar size="xs" name="John Doe" src="https://bit.ly/sage-adebayo" cursor="pointer"/>
      </Flex>
    </Flex>
  )
}