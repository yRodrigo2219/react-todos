// Libs Gráficas
import {
  Container,
  LoadingOverlay,
  Space,
  Stack,
  TextInput,
  PasswordInput,
  Group,
  useMantineTheme,
  Button,
  Center,
  Divider,
  Paper,
  Text,
} from "@mantine/core";
import { UserCircle, At, Mail, Lock, CircleX } from "tabler-icons-react";

// React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Custom Components
import ProfileInfo from "../../components/ProfileInfo";
import openErrorModal from "../../components/Modals/Error";
import openDeleteProfile from "../../components/Modals/DeleteProfile";
import openInfoModal from "../../components/Modals/Info";

// Hooks & Misc.
import { useAuth } from "../../contexts/auth";
import { useFetch } from "../../hooks/useFetch";
import { useModals } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import api, { deleteUser, updateUser } from "../../services/api";
import regex_validate from "../../services/regex";

export default function EditProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {
    data: userInfo,
    isFetching: isFetchingUserInfo,
    error: fetchingUserInfoError,
  } = useFetch(api.get, `/api/v1/users/${user?.username}`);

  const editForm = useForm({
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

  const exclusionForm = useForm({
    initialValues: {
      password: "",
    },
  });

  const theme = useMantineTheme();
  const matches = useMediaQuery(
    theme.fn.smallerThan("xs").replace("@media ", "")
  );
  const modals = useModals();

  useEffect(() => {
    if (userInfo)
      editForm.setValues({
        ...editForm.values,
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
      });
    // eslint-disable-next-line
  }, [userInfo]);

  // Mostrando os erros
  useEffect(() => {
    if (fetchingUserInfoError) {
      if (fetchingUserInfoError.response.status === 401) logout(); // caso não authorizado
      modals.closeAll();
      openErrorModal(modals, "Erro ao receber informações!");
    }
    // eslint-disable-next-line
  }, [fetchingUserInfoError]);

  async function handleUserEdit({ username, ...others }) {
    if (others.password === "") {
      delete others.password;
      delete others.confirmPassword;
    }

    try {
      await updateUser(username, others);

      openInfoModal(modals, "Atualizado com sucesso!");
    } catch (error) {
      openErrorModal(modals, "Erro ao atualizar informações!");
    }
  }

  async function handleUserDeletion(info) {
    openDeleteProfile(modals, async () => {
      try {
        await deleteUser(userInfo.username, info.password);

        logout();
        navigate("/");
        openInfoModal(modals, "Perfil deletado com sucesso!");
      } catch (error) {
        openErrorModal(modals, "Erro ao deletar conta!");
      }
    });
  }

  return (
    <Container size="xl" pb="xl">
      <LoadingOverlay visible={isFetchingUserInfo} />
      <Container size="lg">
        <Stack spacing="xl">
          <Space h="md" />

          {userInfo && (
            <ProfileInfo name={userInfo.name} username={userInfo.username} />
          )}

          <form onSubmit={editForm.onSubmit(handleUserEdit)}>
            <Container size="sm">
              <Divider
                my="md"
                label="Editar Informações"
                labelPosition="center"
                size="sm"
              />
              <Stack spacing="xs">
                <Group grow direction={matches ? "column" : "row"}>
                  <TextInput
                    placeholder="Seu nome"
                    label="Nome"
                    required
                    size="md"
                    icon={<UserCircle />}
                    {...editForm.getInputProps("name")}
                  />
                  <TextInput
                    placeholder="Seu nome de usuário"
                    label="Usuário"
                    required
                    disabled
                    size="md"
                    icon={<At />}
                    {...editForm.getInputProps("username")}
                  />
                </Group>
                <TextInput
                  placeholder="Seu email"
                  label="Email"
                  required
                  size="md"
                  icon={<Mail />}
                  {...editForm.getInputProps("email")}
                />
                <Group grow direction={matches ? "column" : "row"}>
                  <PasswordInput
                    placeholder="Sua nova senha"
                    label="Nova Senha"
                    size="md"
                    icon={<Lock />}
                    {...editForm.getInputProps("password")}
                  />
                  <PasswordInput
                    placeholder="Confime a nova senha"
                    label="Confirmação"
                    size="md"
                    icon={<Lock />}
                    {...editForm.getInputProps("confirmPassword")}
                  />
                </Group>

                <Space h="md" />

                <Center>
                  <Button size="md" type="submit">
                    Confirmar edições
                  </Button>
                </Center>
              </Stack>
            </Container>
          </form>

          <form onSubmit={exclusionForm.onSubmit(handleUserDeletion)}>
            <Container size="sm">
              <Divider
                color="red"
                my="md"
                label="Deletar perfil"
                labelPosition="center"
                size="sm"
              />
              <Stack>
                <Group grow direction={matches ? "column" : "row"}>
                  <Paper shadow="xs" p="md">
                    <Text>
                      A ação de exclusão é <b>irreversivel</b>! <Space h="md" />{" "}
                      Por isso pedimos que você primeiro insira sua senha, para
                      que tenha certeza que quer prosseguir com a{" "}
                      <b style={{ color: "red" }}>exclusão</b> da sua conta
                    </Text>
                  </Paper>
                  <Stack>
                    <PasswordInput
                      placeholder="Seu senha atual"
                      label="Senha"
                      required
                      size="md"
                      icon={<Lock />}
                      {...exclusionForm.getInputProps("password")}
                    />
                    <Center>
                      <Button
                        size="sm"
                        type="submit"
                        color="red"
                        variant="outline"
                        leftIcon={<CircleX />}
                      >
                        Deletar perfil!
                      </Button>
                    </Center>
                  </Stack>
                </Group>
              </Stack>
            </Container>
          </form>
        </Stack>
      </Container>
    </Container>
  );
}
