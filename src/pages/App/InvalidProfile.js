import { Center, Stack, Title } from "@mantine/core";
import { MoodSad } from "tabler-icons-react";

export default function InvalidProfile() {
  return (
    <Center style={{ minHeight: "calc(100vh - 8rem)" }}>
      <Stack align="center">
        <MoodSad
          size="20rem"
          color="#40a4ed"
          style={{ maxWidth: "60vw", height: "auto" }}
        />
        <Title
          style={{
            color: "#185abd",
          }}
          align="center"
        >
          Usuário não encontrado!
        </Title>
      </Stack>
    </Center>
  );
}
