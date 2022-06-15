// Libs Gráficas
import {
  Input,
  Center,
  Stack,
  Paper,
  Image,
  Text,
  PasswordInput,
  Button,
  Anchor,
  Checkbox,
} from "@mantine/core";
import { Mail, Lock } from "tabler-icons-react";

// React
import { Link } from "react-router-dom";

// Custom Components
import FullLogo from "../../assets/FullLogo.png";

// Hooks & Misc.
import { useForm } from "@mantine/form";
import { useAuth } from "../../contexts/auth";
import { useModals } from "@mantine/modals";

export default function LoginPage() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const { login } = useAuth();
  const modals = useModals();

  return (
    <Center style={{ minHeight: "100vh" }}>
      <Paper
        shadow="sm"
        p="xl"
        withBorder
        style={{ maxWidth: "90vw", width: "25rem" }}
        sx={(theme) => ({
          [theme.fn.smallerThan("xs")]: {
            border: "none",
            boxShadow: "none",
            padding: "0.5rem",
          },
        })}
        my="3vh"
      >
        <form onSubmit={form.onSubmit((info) => login(modals, info))}>
          <Stack justify="flex-start" spacing="xl">
            <Center>
              <Image
                src={FullLogo}
                alt="Fazeres"
                style={{ maxWidth: "18rem" }}
              />
            </Center>
            <Text align="center" size="lg">
              Bem vindo de volta ao aplicativo do <b>Fazeres</b>
            </Text>

            <Stack justify="flex-start" spacing="xs">
              <Input
                size="md"
                icon={<Mail />}
                placeholder="Email"
                {...form.getInputProps("email")}
              />
              <Stack justify="flex-start" spacing="xs">
                <PasswordInput
                  size="md"
                  icon={<Lock />}
                  placeholder="Senha"
                  {...form.getInputProps("password")}
                />
                <Checkbox
                  label="Lembrar de mim"
                  {...form.getInputProps("remember", {
                    type: "checkbox",
                  })}
                />
              </Stack>
            </Stack>

            <Button size="md" type="submit">
              Entrar
            </Button>

            <Text align="center">
              Não tem conta ainda?{" "}
              <Anchor component={Link} to="/registro">
                Criar conta agora
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
