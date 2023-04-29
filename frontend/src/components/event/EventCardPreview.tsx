import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { EventFactory } from "../../../../backend/typechain-types/EventFactory";

export default function EventCardPreview({
  event,
}: {
  event: EventFactory.EventStructOutput;
}) {
  return (
    <Box m="10px" maxW={"300px"} w="100%">
      <Card boxShadow="dark-lg">
        <CardHeader>
          <Heading size="md">{event.name}</Heading>
          <Text fontSize="lg" color={"teal.400"}>
            Le{" "}
            {new Date(event.date.toNumber()).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
        </CardHeader>
        <CardBody>
          <Stack>
            <Text>{event.description}</Text>
            <Text color="teal.600" fontSize="2xl">
              {event.ticketPrice.toNumber()} ETH
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <Link href={`/events/${event.id.toNumber()}`}>
            <Button colorScheme="teal">Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </Box>
  );
}
