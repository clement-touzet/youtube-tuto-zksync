"use client";

import { prepareWriteEventFactory } from "@/generated";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { ethers } from "ethers";
import { switchNetwork, writeContract } from "@wagmi/core";
import {
  getEventFactoryNetwork,
  getEventFactoryAddress,
} from "@/features/contracts/getAddresse";
import { useState } from "react";
import { trySwitchNetwork } from "@/features/wagmiChains/trySwitchNetwork";

interface INewEventForm {
  eventName: string;
  description: string;
  date: string;
  ticketPrice: number;
}

export default function NewEventForm() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventSchema = Yup.object().shape({
    eventName: Yup.string().required("Nom requis"),
    description: Yup.string(),
    date: Yup.date().required("Vous devez choisir une date"),
    ticketPrice: Yup.number().required("Vous devez choisir le prix"),
  });

  const eventFactoryAddress: `0x${string}` = getEventFactoryAddress();
  const defaultTicketPriceValue: number = 0;
  return (
    <Formik
      initialValues={{
        eventName: "",
        description: "",
        date: "",
        ticketPrice: defaultTicketPriceValue,
      }}
      validationSchema={eventSchema}
      onSubmit={async (values) => {
        setError(false);
        setLoading(true);
        const dateInMs: number = new Date(values.date).getTime();
        console.log("values", values);
        try {
          await trySwitchNetwork();
          console.log("switched network");
          const config = await prepareWriteEventFactory({
            address: eventFactoryAddress,
            functionName: "createEvent",
            args: [
              values.eventName,
              values.description,
              ethers.BigNumber.from(dateInMs),
              ethers.BigNumber.from(values.ticketPrice),
            ],
          });
          const data = await writeContract(config);
        } catch (error) {
          console.log("error", error);
          setError(true);
        }
        setLoading(false);
      }}
    >
      {(props: FormikProps<INewEventForm>) => {
        const { errors, touched } = props;

        return (
          <Form>
            <FormControl
              mt={"10px"}
              isInvalid={!!errors.eventName && touched.eventName}
            >
              <FormLabel>Name</FormLabel>
              <Field
                variant="filled"
                placeholder="Event name"
                name="eventName"
                id="eventName"
                as={Input}
                autoComplete="off"
              />
              <FormErrorMessage>{errors.eventName}</FormErrorMessage>
            </FormControl>
            <FormControl
              mt={"10px"}
              isInvalid={!!errors.description && touched.description}
            >
              <FormLabel>Description</FormLabel>
              <Field
                as={Textarea}
                variant="filled"
                placeholder="description"
                name="description"
                id="description"
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"10px"} isInvalid={!!errors.date && touched.date}>
              <FormLabel>Date</FormLabel>
              <Field
                as={Input}
                name="date"
                id="date"
                variant="filled"
                type="date"
                placeholder="date"
              />
              <FormErrorMessage>{errors.date}</FormErrorMessage>
            </FormControl>
            <FormControl
              mt={"10px"}
              isInvalid={!!errors.ticketPrice && touched.ticketPrice}
            >
              <FormLabel>Ticket Price (ETH)</FormLabel>
              <Field name="ticketPrice">
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<any>;
                  form: FormikProps<INewEventForm>;
                }) => (
                  <>
                    <NumberInput
                      defaultValue={defaultTicketPriceValue}
                      onChange={(val) => form.setFieldValue(field.name, val)}
                      variant="filled"
                      min={0}
                      placeholder="ticket price"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </>
                )}
              </Field>
              <FormErrorMessage>{errors.ticketPrice}</FormErrorMessage>
            </FormControl>

            <Box mt={"20px"} mb={"20px"}>
              {error && <Text color="red">Error</Text>}
              <Button isLoading={loading} colorScheme="teal" type="submit">
                Create
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
