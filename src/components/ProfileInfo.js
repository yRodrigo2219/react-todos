import { Avatar, Stack, Group, Text } from "@mantine/core";

export default function ProfileInfo({ name, username }) {
  return (
    <Group
      sx={(theme) => ({
        [theme.fn.smallerThan("xs")]: {
          flexDirection: "column",
        },
      })}
    >
      <Avatar
        src={`https://avatars.dicebear.com/api/micah/${username}.svg`}
        size="10rem"
        radius="50%"
      />
      <Stack spacing="xs">
        <Text style={{ fontSize: "2rem" }}>{name}</Text>
        <Text size="xl">@{username}</Text>
      </Stack>
    </Group>
  );
}
