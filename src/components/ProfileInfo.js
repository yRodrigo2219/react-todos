import { Avatar, Stack, Group, Text } from "@mantine/core";
import { avatarSrc } from "../services/avatar";

export default function ProfileInfo({ name, username }) {
  return (
    <Group
      sx={(theme) => ({
        [theme.fn.smallerThan("xs")]: {
          flexDirection: "column",
        },
      })}
    >
      <Avatar src={avatarSrc(username)} size="10rem" radius="50%" />
      <Stack spacing="xs">
        <Text style={{ fontSize: "2rem" }}>{name}</Text>
        <Text size="xl">@{username}</Text>
      </Stack>
    </Group>
  );
}
