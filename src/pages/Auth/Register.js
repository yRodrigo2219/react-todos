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
import { Link, useNavigate } from "react-router-dom";

// Custom Components
import FullLogo from "../../assets/FullLogo.png";
import TodoHero from "../../assets/TodoHero.png";
import openErrorModal from "../../components/Modals/Error";
import openInfoModal from "../../components/Modals/Info";

// Hooks & Misc.
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import { createUser } from "../../services/api";
import regex_validate from "../../services/regex";

export default function RegisterPage() {
  const form = useForm({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: regex_validate.email,
      name: regex_validate.name,
      username: regex_validate.username,
      password: (value) =>
        value === "" ? null : regex_validate.password(value),
      confirmPassword: (value, values) =>
        value === values.password ? null : "As senhas não combinam",
    },
  });

  const navigate = useNavigate();

  const theme = useMantineTheme();
  const matches = useMediaQuery(
    theme.fn.smallerThan("xs").replace("@media ", "")
  );
  const modals = useModals();

  async function handleUserCreation(info) {
    try {
      await createUser(info.name, info.username, info.email, info.password);

      openInfoModal(modals, "Sucesso ao criar conta!", () => {
        navigate("/");
      });
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal(modals, "Erro ao fazer o registro!", errorList);
    }
  }

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
        <form onSubmit={form.onSubmit(handleUserCreation)}>
          <Stack justify="flex-start" spacing="xl">
            <Box>
              <Image src={FullLogo} alt="Fazeres" width="8rem" />
              <Text style={{ fontSize: "1.5rem" }}>
                Criar sua conta Fazeres
              </Text>
            </Box>
            <Group grow>
              <Stack justify="flex-start" spacing="xs">
                <TextInput
                  placeholder="Seu nome"
                  label="Nome"
                  required
                  size="md"
                  icon={<UserCircle />}
                  {...form.getInputProps("name")}
                />
                <TextInput
                  placeholder="Seu nome de usuário"
                  label="Usuário"
                  required
                  size="md"
                  icon={<At />}
                  {...form.getInputProps("username")}
                />
                <TextInput
                  placeholder="Seu email"
                  label="Email"
                  required
                  size="md"
                  icon={<Mail />}
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  placeholder="Sua senha"
                  label="Senha"
                  required
                  size="md"
                  icon={<Lock />}
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  placeholder="Confirme sua senha"
                  label="Confirmação da Senha"
                  required
                  size="md"
                  icon={<Lock />}
                  {...form.getInputProps("confirmPassword")}
                />
                <Group position="apart" py="1rem">
                  <Button variant="subtle" size="sm" component={Link} to="/">
                    Fazer Login
                  </Button>
                  <Button size="md" type="submit">
                    Criar Conta
                  </Button>
                </Group>
              </Stack>
              {matches ? null : (
                <Stack>
                  <Center>
                    <Image
                      src={TodoHero}
                      alt=""
                      style={{ maxWidth: "14rem" }}
                    />
                  </Center>
                  <Text align="center" size="lg" px="2rem">
                    Uma única conta. Todas as suas tarefas armazenadas
                  </Text>
                </Stack>
              )}
            </Group>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
