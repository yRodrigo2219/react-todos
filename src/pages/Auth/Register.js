// Libs Gráficas
import {
  TextInput,
  Center,
  Stack,
  Paper,
  Image,
  Text,
  PasswordInput,
  Button,
  Box,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { Mail, Lock, UserCircle, At } from "tabler-icons-react";

// React
import { Link } from "react-router-dom";

// Custom Components
import FullLogo from "../../assets/FullLogo.png";
import TodoHero from "../../assets/TodoHero.png";

// Hooks & Misc.
import { useMediaQuery } from "@mantine/hooks";

export default function RegisterPage() {
  const theme = useMantineTheme();
  const matches = useMediaQuery(
    theme.fn.smallerThan("xs").replace("@media ", "")
  );

  return (
    <Center style={{ minHeight: "100vh" }}>
      <Paper
        shadow="sm"
        p="xl"
        withBorder
        style={{ maxWidth: "90vw", width: "50rem" }}
        sx={(theme) => ({
          [theme.fn.smallerThan("xs")]: {
            border: "none",
            boxShadow: "none",
            padding: "0.5rem",
          },
        })}
        my="3vh"
      >
        <Stack justify="flex-start" spacing="xl">
          <Box>
            <Image src={FullLogo} alt="Fazeres" width="8rem" />
            <Text style={{ fontSize: "1.5rem" }}>Criar sua conta Fazeres</Text>
          </Box>
          <Group grow>
            <Stack justify="flex-start" spacing="xs">
              <TextInput
                placeholder="Seu nome"
                label="Nome"
                required
                size="md"
                icon={<UserCircle />}
              />
              <TextInput
                placeholder="Seu nome de usuário"
                label="Nome de usuário"
                required
                size="md"
                icon={<At />}
              />
              <TextInput
                placeholder="Seu email"
                label="Email"
                required
                size="md"
                icon={<Mail />}
              />
              <PasswordInput
                placeholder="Sua senha"
                label="Senha"
                required
                size="md"
                icon={<Lock />}
              />
              <PasswordInput
                placeholder="Confirme sua senha"
                label="Confirmação da Senha"
                required
                size="md"
                icon={<Lock />}
              />
              <Group position="apart" py="1rem">
                <Button variant="subtle" size="sm" component={Link} to="/">
                  Fazer Login
                </Button>
                <Button size="md">Criar Conta</Button>
              </Group>
            </Stack>
            {matches ? null : (
              <Stack>
                <Center>
                  <Image src={TodoHero} alt="" style={{ maxWidth: "14rem" }} />
                </Center>
                <Text align="center" size="lg" px="2rem">
                  Uma única conta. Todas as suas tarefas armazenadas
                </Text>
              </Stack>
            )}
          </Group>
        </Stack>
      </Paper>
    </Center>
  );
}
