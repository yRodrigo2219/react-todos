import {
  Container,
  Group,
  Image,
  Autocomplete,
  ActionIcon,
  Avatar,
  useMantineTheme,
  Stack,
  Menu,
} from "@mantine/core";
import {
  UserSearch,
  UserExclamation,
  Logout as LogoutIcon,
  UserCircle,
} from "tabler-icons-react";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";

import FullLogo from "../assets/FullLogo.png";
import { useAuth } from "../contexts/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const [settingsOpened, handlersSettings] = useDisclosure(false);
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const matches = useMediaQuery(
    theme.fn.smallerThan("xs").replace("@media ", "")
  );

  function goToProfile(selected) {
    navigate(`/perfil/${selected.value}`);
  }

  return (
    <Container fluid style={{ boxShadow: "0 1px 6px 0 rgb(32 33 36 / 28%)" }}>
      <Container size="xl" py="0.5rem">
        <Stack spacing="xs">
          <Group position="apart" style={{ height: "3rem" }} grow>
            <Group align="center" grow style={{ maxWidth: "100%" }}>
              <Image
                src={FullLogo}
                alt="Fazeres"
                height="3.5rem"
                width="auto"
                style={{ flexGrow: 0 }}
              />
              {matches ? null : (
                <Autocomplete
                  placeholder="Procurar usuário"
                  data={["y2219", "rodrigo"]}
                  radius="xl"
                  icon={<UserSearch />}
                  style={{ maxWidth: "min(50vw, 25rem)" }}
                  onItemSubmit={goToProfile}
                />
              )}
            </Group>

            <Menu
              style={{ flexGrow: 0 }}
              opened={settingsOpened}
              onOpen={handlersSettings.open}
              onClose={handlersSettings.close}
              position="left"
              control={
                <ActionIcon size="xl" radius="xl">
                  <Avatar
                    src={`https://avatars.dicebear.com/api/micah/${user?.username}.svg?flip=true`}
                    alt="Profile"
                    radius="xl"
                  />
                </ActionIcon>
              }
            >
              <Menu.Label>Conta</Menu.Label>
              <Menu.Item
                icon={<UserCircle size="1rem" />}
                component={Link}
                to="/"
              >
                Mostrar Perfil
              </Menu.Item>
              <Menu.Item
                icon={<UserExclamation size="1rem" />}
                component={Link}
                to="/editar-perfil"
              >
                Editar Perfil
              </Menu.Item>
              <Menu.Label>Sessão</Menu.Label>
              <Menu.Item
                color="red"
                icon={<LogoutIcon size="1rem" />}
                onClick={logout}
              >
                Sair
              </Menu.Item>
            </Menu>
          </Group>
          {matches ? (
            <Autocomplete
              placeholder="Procurar usuário"
              data={["y2219", "rodrigo"]}
              radius="xl"
              icon={<UserSearch />}
              onItemSubmit={goToProfile}
            />
          ) : null}
        </Stack>
      </Container>
    </Container>
  );
}
