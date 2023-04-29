import { Flex, Heading, Stack, Text } from "@chakra-ui/react";

export default function Detail({
  detailName,
  children,
}: {
  detailName: string;
  children: React.ReactNode;
}) {
  return (
    <Stack>
      <Heading fontSize={"md"}>{detailName}</Heading>
      {children}
    </Stack>
  );
}
