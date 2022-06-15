import { Center, Space, Stack, Title, Anchor, Text } from "@mantine/core";
import { Error404 } from "tabler-icons-react";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Center style={{ minHeight: "calc(100vh - 8rem)" }}>
      <Stack align="center" spacing="xs">
        <Error404
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
          Página não encontrada!
        </Title>
        <Space h="lg" />

        <Text size="xl">
          Parece que a página pesquisada não existe!{" "}
          <Anchor component={Link} to="/" size="xl">
            Voltar para página inicial...
          </Anchor>
        </Text>
      </Stack>
    </Center>
  );
}
