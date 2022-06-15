import { Center, Space, Stack, Title, Anchor, Text } from "@mantine/core";
import { HandStop } from "tabler-icons-react";

import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <Center style={{ minHeight: "100vh" }}>
      <Stack align="center" spacing="xs">
        <HandStop
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
          Acesso não autorizado!
        </Title>
        <Space h="lg" />

        <Text size="xl">
          Parece que você ainda não tem permissão para acessar esta página!{" "}
          <Anchor component={Link} to="/" size="xl">
            Voltar para o inicio...
          </Anchor>
        </Text>
      </Stack>
    </Center>
  );
}
