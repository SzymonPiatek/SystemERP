import {
  Box,
  Flex,
  Avatar,
  Slider,
  SliderTrack,
  VStack,
  Button,
  SliderMarker,
} from "@chakra-ui/react";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";
import { FC, useState, useEffect } from "react";

type NavbarProps = {
  Start: number;
  End: number;
  Restaurants?: String[];
  Orders?: [];
};

export const Navbar: FC<NavbarProps> = (props) => {
  const [isStarted, setIsStarted] = useState(false);
  const start = () => setIsStarted(!isStarted);

  const [dt, setDt] = useState(0);
  const getTime = () => {
    const d = new Date();
    const time = d.getHours() * 60 + d.getMinutes();
    setDt(time);
  };
  useEffect(() => {
    getTime();
    let minTimer = setInterval(() => {
      getTime();
    }, 6000);

    return () => clearInterval(minTimer);
  }, []);

  return (
    <Box width="full" mb="2" position="sticky" top="0" right="0" zIndex="999">
      <Flex color="white" bg="white" w="100%" zIndex={10}>
        <Box flex="1">
          <VStack>
            <Box w="full" color="black" pl="3">
              Przyjęto {props.Orders?.length} zamówień {dt}
            </Box>
            <Box w="full" p="3"></Box>
          </VStack>
        </Box>
        <Box p="4" minW="140">
          {isStarted && (
            <Box>
              <Button colorScheme="gray" onClick={start}>
                <RiPlayFill color="black" />
              </Button>
            </Box>
          )}
          {!isStarted && (
            <Box>
              <Button colorScheme="gray" onClick={start}>
                <RiPauseFill color="black" />
              </Button>
            </Box>
          )}
        </Box>
        <Box w="250px" p="4"></Box>
        <Box borderLeft=" 1px solid" p="4" borderColor="brand.100">
          {/* <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> */}
        </Box>
      </Flex>
    </Box>
  );
};
export default Navbar;
