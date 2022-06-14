import {
  Container,
  Group,
  Image,
  Autocomplete,
  ActionIcon,
  Avatar,
  useMantineTheme,
  Stack,
} from "@mantine/core";
import { UserSearch, Settings } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";

import FullLogo from "../assets/FullLogo.png";
import { useAuth } from "../contexts/auth";

export default function Header() {
  const { user } = useAuth();
  const theme = useMantineTheme();
  const matches = useMediaQuery(
    theme.fn.smallerThan("xs").replace("@media ", "")
  );

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
                />
              )}
            </Group>

            <Group noWrap style={{ flexGrow: 0 }}>
              <ActionIcon size="lg">
                <Settings size="2rem" />
              </ActionIcon>
              <ActionIcon size="xl" radius="xl">
                <Avatar
                  src={`https://avatars.dicebear.com/api/micah/${"y2219"}.svg?flip=true`}
                  alt="Profile"
                  height="3rem"
                  width="auto"
                  radius="xl"
                />
              </ActionIcon>
            </Group>
          </Group>
          {matches ? (
            <Autocomplete
              placeholder="Procurar usuário"
              data={["y2219", "rodrigo"]}
              radius="xl"
              icon={<UserSearch />}
            />
          ) : null}
        </Stack>
      </Container>
    </Container>
  );
}
