"use client";
import { useEventFactoryGetEvent } from "@/generated";
import { Box, Heading, Text } from "@chakra-ui/react";
import eventFactoryInfos from "../../../../../backend/deployedContractsInfo/eventFactory.json";
import { ethers } from "ethers";
import Detail from "@/components/event/Details/Detail";
import Details from "@/components/event/Details/Details";
import { EventFactory } from "../../../../../backend/typechain-types/EventFactory";
import {
  getEventFactoryAddress,
  getEventFactoryNetwork,
} from "@/features/contracts/getAddresse";

const EventDetails = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const eventFactoryAddress: `0x${string}` = getEventFactoryAddress();
  const eventFactoryChainId = getEventFactoryNetwork();

  // useContractRead one event from the id param
  const { isLoading, isError, data } = useEventFactoryGetEvent({
    address: eventFactoryAddress,
    args: [ethers.BigNumber.from(params.id)],
    onSettled(data: EventFactory.EventStructOutput | undefined) {
      console.log("Event:", data);
    },
    chainId: eventFactoryChainId,
  });

  return (
    <Box>
      {!isLoading && !isError && <Details event={data} />}
      <Box>{isLoading && <Text>Loading...</Text>}</Box>
      <Box>{isError && <Text>Error...</Text>}</Box>
    </Box>
  );
};

export default EventDetails;
