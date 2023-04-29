import {
  Box,
  Card,
  Center,
  Container,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { EventFactory } from "../../../../../backend/typechain-types/EventFactory";
import Detail from "./Detail";

export default function Details({
  event,
}: {
  event: EventFactory.EventStructOutput | undefined;
}) {
  return (
    <Box m={10}>
      <Container maxW="container.lg">
        <Card p={4}>
          <Stack spacing={4}>
            <Center>
              <Heading size="lg">Details</Heading>
            </Center>

            <Detail detailName={"Name"}>
              <Text>{event?.name}</Text>
            </Detail>
            <Detail detailName={"Description"}>
              {event?.description ? (
                <Text>{event.description}</Text>
              ) : (
                <Text color="red.600"></Text>
              )}
            </Detail>
            {event?.date && (
              <Detail detailName={"Date"}>
                <Text>
                  {new Date(event.date.toNumber()).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Text>
              </Detail>
            )}
            {event?.ticketPrice && (
              <Detail detailName={"Ticket price"}>
                <Text>{event?.ticketPrice.toNumber()} ETH</Text>
              </Detail>
            )}
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
