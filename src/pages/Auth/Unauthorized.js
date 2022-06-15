import { Center, Space, Stack, Title, Anchor, Text } from "@mantine/core";
import { HandStop } from "tabler-icons-react";

import { Link, useNavigate } from "react-router-dom";
import useCountdown from "../../hooks/useCountdown";
import { useEffect } from "react";

export default function Unauthorized() {
  const { time, isFinished } = useCountdown(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFinished()) navigate("/");
    // eslint-disable-next-line
  }, [isFinished()]);

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

        <Text size="xl" px="xs" align="center">
          Parece que você ainda não tem permissão para acessar esta página!
          <br /> Você será redirecionado para o inicio em {time} segundos!{" "}
          <Anchor component={Link} to="/" size="xl">
            Voltar para o inicio agora...
          </Anchor>
        </Text>
      </Stack>
    </Center>
  );
}
