"use client";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import eventFactoryInfos from "../../../backend/deployedContractsInfo/eventFactory.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      w="100%"
      display={"flex"}
      alignItems={"center"}
      borderBottom={"1px black solid"}
      justifyContent={"space-between"}
    >
      <Flex>
        <Link
          href=""
          p={2}
          m={2}
          fontSize="20px"
          borderRadius="4px"
          _hover={{ background: "#43968E", color: "white" }}
        >
          Home
        </Link>
        <Link
          href="/events"
          p={2}
          m={2}
          fontSize="20px"
          borderRadius="4px"
          _hover={{ background: "#43968E", color: "white" }}
        >
          All events
        </Link>
        <Link
          href="/events/create"
          p={2}
          m={2}
          fontSize="20px"
          borderRadius="4px"
          _hover={{ background: "#43968E", color: "white" }}
        >
          Create event
        </Link>
      </Flex>

      <HStack m={2}>
        <ConnectButton />
        <Button colorScheme="teal" onClick={() => toggleColorMode()}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </HStack>
    </Box>
  );
};

export default Navbar;
