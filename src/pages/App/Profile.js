// Libs Gráficas
import {
  Container,
  Stack,
  Space,
  Accordion,
  Checkbox,
  Text,
  Group,
  Button,
  Center,
  RadioGroup,
  Radio,
  Paper,
  LoadingOverlay,
} from "@mantine/core";
import { Trash, Edit, Plus } from "tabler-icons-react";

// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Custom Components
import InvalidProfile from "./InvalidProfile";
import ProfileInfo from "../../components/ProfileInfo";
import openEditTaskModal from "../../components/Modals/EditTask";
import openAddTaskModal from "../../components/Modals/AddTask";
import openDeleteTaskModal from "../../components/Modals/DeleteTask";
import openErrorModal from "../../components/Modals/Error";

// Hooks & Misc.
import { useAuth } from "../../contexts/auth";
import { useModals } from "@mantine/modals";
import { useFetch } from "../../hooks/useFetch";
import api, { createToDo, deleteToDo, updateToDo } from "../../services/api";

export default function ProfilePage({ own }) {
  const { user, logout } = useAuth();

  const { username } = useParams();
  const [isOwner, setIsOwner] = useState(own ?? username === user?.username);

  const [filter, setFilter] = useState({
    visibility: isOwner ? "all" : "public",
    status: "all",
  });

  const {
    data: todos,
    isFetching: isFetchingTodos,
    error: fetchingTodoError,
    forceUpdate: forceUpdateTodos,
  } = useFetch(
    api.get,
    `/api/v1/users/${username ? username : user.username}/todos`,
    {
      params: {
        visibility: filter.visibility,
        status: filter.status,
      },
    }
  );

  const {
    data: userInfo,
    isFetching: isFetchingUserInfo,
    error: fetchingUserInfoError,
  } = useFetch(api.get, `/api/v1/users/${username ? username : user.username}`);

  const modals = useModals();

  // Mostrando os erros
  useEffect(() => {
    if (fetchingTodoError) {
      if (fetchingTodoError.response.status === 401) logout(); // caso não authorizado
      openErrorModal(modals, "Erro ao receber as tarefas!");
    }

    if (fetchingUserInfoError) {
      if (fetchingUserInfoError.response.status === 401) logout(); // caso não authorizado
      modals.closeAll();
      openErrorModal(modals, "Usuário inválido!");
    }
    // eslint-disable-next-line
  }, [fetchingTodoError, fetchingUserInfoError]);

  // Checka se o novo usuario é dono
  useEffect(() => {
    if (userInfo?.username === user?.username) {
      setIsOwner(true);
      handleFilterChange("visibility", "all");
    } else {
      setIsOwner(false);
      handleFilterChange("visibility", "public");
    }
    // eslint-disable-next-line
  }, [userInfo]);

  function handleFilterChange(key, value) {
    setFilter({
      ...filter,
      [key]: value,
    });

    forceUpdateTodos();
  }

  async function handleTaskAdd(newTask) {
    try {
      await createToDo(user.username, newTask);
      forceUpdateTodos();
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal(modals, "Erro ao adicionar tarefa", errorList);
    }
  }

  async function handleTaskUpdate(id, change) {
    try {
      await updateToDo(user.username, id, change);
      forceUpdateTodos();
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal(modals, "Erro ao modificar tarefa", errorList);
    }
  }

  async function handleTaskDelete(id) {
    try {
      await deleteToDo(user.username, id);
      forceUpdateTodos();
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal(modals, "Erro ao deletar tarefa", errorList);
    }
  }

  return (
    <Container size="xl" pb="xl">
      <LoadingOverlay visible={isFetchingTodos || isFetchingUserInfo} />
      {!fetchingUserInfoError ? (
        <Container size="lg">
          <Stack spacing="xl">
            <Space h="md" />

            {userInfo && (
              <ProfileInfo name={userInfo.name} username={userInfo.username} />
            )}

            <Group position="apart">
              <Space h="xl" />
              <Paper shadow="xs" p="md">
                <Stack>
                  <RadioGroup
                    label="Selecione a visibilidade"
                    value={isOwner ? filter.visibility : "public"}
                    onChange={(e) => handleFilterChange("visibility", e)}
                    spacing="xs"
                  >
                    <Radio value="all" label="Todos" disabled={!isOwner} />
                    <Radio
                      value="private"
                      label="Privados"
                      disabled={!isOwner}
                    />
                    <Radio
                      value="public"
                      label="Públicos"
                      disabled={!isOwner}
                    />
                  </RadioGroup>
                  <RadioGroup
                    label="Selecione o status"
                    value={filter.status}
                    onChange={(e) => handleFilterChange("status", e)}
                    spacing="xs"
                  >
                    <Radio value="all" label="Todos" />
                    <Radio value="done" label="Feitos" />
                    <Radio value="not_done" label="Não feitos" />
                  </RadioGroup>
                </Stack>
              </Paper>
            </Group>

            {isOwner && (
              <Center>
                <Button
                  leftIcon={<Plus />}
                  onClick={() => openAddTaskModal(modals, handleTaskAdd)}
                >
                  Adicionar Tarefa
                </Button>
              </Center>
            )}

            <Accordion disableIconRotation multiple>
              {todos?.map((task) => (
                <Accordion.Item
                  key={task.id}
                  label={task.title}
                  icon={
                    <Checkbox
                      size="md"
                      radius="xl"
                      checked={task.is_done}
                      onChange={() => {
                        isOwner &&
                          handleTaskUpdate(task.id, { is_done: !task.is_done });
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                >
                  <Text>{task.description}</Text>
                  {isOwner ? (
                    <Group position="right">
                      {task.is_done ? null : (
                        <Button
                          variant="outline"
                          leftIcon={<Edit />}
                          size="xs"
                          onClick={() =>
                            openEditTaskModal(modals, task, handleTaskUpdate)
                          }
                        >
                          Editar
                        </Button>
                      )}
                      <Button
                        color="red"
                        variant="outline"
                        leftIcon={<Trash />}
                        size="xs"
                        onClick={() =>
                          openDeleteTaskModal(modals, task.id, handleTaskDelete)
                        }
                      >
                        Deletar
                      </Button>
                    </Group>
                  ) : null}
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      ) : (
        <InvalidProfile />
      )}
    </Container>
  );
}
