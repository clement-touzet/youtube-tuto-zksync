"use client";
import { useState, useEffect } from "react";
import EventCardPreview from "@/components/event/EventCardPreview";
import {
  readEventFactory,
  useEventFactoryGetAllEvents,
  useEventFactoryGetEventIds,
  useEventFactoryRead,
} from "@/generated";
import { Box, Heading, Text } from "@chakra-ui/react";
import type { EventFactory } from "../../../../backend/typechain-types/EventFactory";
import {
  getEventFactoryAddress,
  getEventFactoryNetwork,
} from "@/features/contracts/getAddresse";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";

const Events = () => {
  const [events, setEvents] = useState<
    readonly EventFactory.EventStructOutput[]
  >([]);

  const eventFactoryAddress: `0x${string}` = getEventFactoryAddress();
  const eventFactoryChainId = getEventFactoryNetwork();

  const { data, isLoading, isError } = useEventFactoryRead({
    address: eventFactoryAddress,
    functionName: "getAllEvents",
    onSuccess: (data: readonly EventFactory.EventStructOutput[]) => {
      setEvents(data);
    },
    chainId: eventFactoryChainId,
  });

  useEffect(() => {}, []);

  return (
    <Box>
      <Heading m={5}>All events</Heading>
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
        {!isError &&
          !isLoading &&
          events.map((event) => {
            return <EventCardPreview key={event.id.toString()} event={event} />;
          })}
        {isLoading && <Text>Loading...</Text>}
        {isError && <Text>Error (try to change network)</Text>}
      </Box>
    </Box>
  );
};

export default Events;
