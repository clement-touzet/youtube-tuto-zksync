"use client";
import { Box, Heading } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <Box>
      <Heading m={5}>Home</Heading>
    </Box>
  );
};

export default Home;
