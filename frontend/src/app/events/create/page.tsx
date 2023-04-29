"use client";
import NewEventForm from "@/components/event/NewEventForm";
import { Alert, AlertIcon, Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const CreateEvent = () => {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Box>
      <Heading m={5}>Create Event</Heading>
      <Box w="500px" m="0 auto">
        {isConnected ? (
          <NewEventForm />
        ) : (
          <Alert status="info" borderRadius={"4px"}>
            <AlertIcon />
            You must connect your wallet to create an event
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default CreateEvent;
