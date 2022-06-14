import {
  Container,
  Stack,
  Space,
  Accordion,
  Checkbox,
  Text,
  Group,
  Button,
  TextInput,
  Textarea,
  Center,
  RadioGroup,
  Radio,
  Paper,
  LoadingOverlay,
} from "@mantine/core";
import { Trash, Edit, Plus } from "tabler-icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileInfo from "../../components/ProfileInfo";
import { useAuth } from "../../contexts/auth";
import {
  createToDo,
  deleteToDo,
  getUserInfo,
  getUserToDos,
  updateToDo,
} from "../../services/api";
import { useModals } from "@mantine/modals";

export default function ProfilePage({ own }) {
  const { user, logout } = useAuth();

  const { username } = useParams();
  const [isOwner, setIsOwner] = useState(own);

  const [filter, setFilter] = useState({
    visibility: isOwner ? "all" : "public",
    status: "all",
  });
  const [tasks, setTasks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [shouldUpdateTasks, setShouldUpdateTasks] = useState(false);

  const modals = useModals();

  useEffect(() => {
    if (shouldUpdateTasks) {
      if (username) fetchUserTodos(username);
      else fetchUserTodos(user.username);
    }
    setShouldUpdateTasks(false);
    // eslint-disable-next-line
  }, [shouldUpdateTasks]);

  useEffect(() => {
    if (username) {
      setIsOwner(username === user?.username);
      setFilter({
        ...filter,
        visibility: username === user?.username ? "all" : "public",
      });
      fetchUserInfo(username);
    } else {
      setIsOwner(own);
      setFilter({
        ...filter,
        visibility: "all",
      });
      fetchUserInfo(user.username);
    }

    setShouldUpdateTasks(true);
    // eslint-disable-next-line
  }, [username, own, user]);

  function handleFilterChange(key, value) {
    setFilter({
      ...filter,
      [key]: value,
    });

    setShouldUpdateTasks(true);
  }

  async function handleTaskAdd(newTask) {
    try {
      await createToDo(user.username, newTask);
      setShouldUpdateTasks(true);
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal("Erro ao adicionar tarefa", errorList);
    }
  }

  async function handleTaskUpdate(id, change) {
    try {
      await updateToDo(user.username, id, change);
      setShouldUpdateTasks(true);
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal("Erro ao modificar tarefa", errorList);
    }
  }

  async function handleTaskDelete(id) {
    try {
      await deleteToDo(user.username, id);
      setShouldUpdateTasks(true);
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal("Erro ao deletar tarefa", errorList);
    }
  }

  async function fetchUserInfo(username) {
    try {
      const info = await getUserInfo(username);

      setUserInfo(info);
    } catch (error) {
      if (error.response.status === 401) logout();
      else alert("Usuário inválido!");
    }
  }

  async function fetchUserTodos(username) {
    try {
      const todos = await getUserToDos(username, filter);

      setTasks(todos);
    } catch (error) {
      if (error.response.status === 401) logout();
    }
  }

  function openErrorModal(title, errorList) {
    const id = modals.openModal({
      title,

      children: (
        <>
          {errorList.map((err) => (
            <Text color="red">{err}</Text>
          ))}
          <Button
            onClick={() => {
              modals.closeModal(id);
            }}
            mt="md"
          >
            Okay
          </Button>
        </>
      ),
    });
  }

  function openDeleteTaskModal(id) {
    modals.openConfirmModal({
      title: "Deletar tarefa",
      centered: true,
      children: (
        <Text size="sm">
          Tem certeza que quer deletar essa tarefa? Essa ação não é reversivel!
        </Text>
      ),
      labels: {
        confirm: "Deletar tarefa",
        cancel: "Não, deixa ela ai",
      },
      confirmProps: { color: "red" },
      onConfirm: () => handleTaskDelete(id),
    });
  }

  function openAddTaskModal() {
    const id = modals.openModal({
      title: "Adicionar nova tarefa",
      children: (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTaskAdd({
              title: e.target[0].value,
              description: e.target[1].value,
              is_public: e.target[2].checked,
              is_done: e.target[3].checked,
            });
            modals.closeModal(id);
          }}
        >
          <Stack>
            <TextInput label="Título" placeholder="Título da tarefa" required />
            <Textarea
              label="Descrição"
              placeholder="Descreva sua tarefa aqui"
              required
            />
            <Checkbox label="É pública?" />
            <Checkbox label="Já está concluída?" />
            <Button fullWidth mt="md" type="submit" leftIcon={<Plus />}>
              Adicionar Tarefa
            </Button>
          </Stack>
        </form>
      ),
    });
  }

  function openEditTaskModal(task) {
    const id = modals.openModal({
      title: "Editar tarefa",
      children: (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTaskUpdate(task.id, {
              title: e.target[0].value,
              description: e.target[1].value,
              is_public: e.target[2].checked,
            });
            modals.closeModal(id);
          }}
        >
          <Stack>
            <TextInput
              label="Título"
              placeholder="Título da tarefa"
              defaultValue={task.title}
              required
            />
            <Textarea
              label="Descrição"
              placeholder="Descreva sua tarefa aqui"
              defaultValue={task.description}
              required
            />
            <Checkbox label="É pública?" defaultChecked={task.is_public} />
            <Button fullWidth mt="md" type="submit">
              Confirmar Edição
            </Button>
          </Stack>
        </form>
      ),
    });
  }

  return (
    <Container size="xl">
      <LoadingOverlay visible={false} />
      <Container size="lg">
        <Stack spacing="xl">
          <Space h="md" />

          {userInfo && (
            <ProfileInfo name={userInfo.name} username={userInfo.username} />
          )}

          <Group position="apart">
            <Space h="xl" />
            <Paper shadow="xs" p="md">
              <RadioGroup
                label="Selecione a visibilidade"
                value={filter.visibility}
                onChange={(e) => handleFilterChange("visibility", e)}
                spacing="xs"
              >
                <Radio value="all" label="Todos" disabled={!isOwner} />
                <Radio value="private" label="Privados" disabled={!isOwner} />
                <Radio value="public" label="Públicos" disabled={!isOwner} />
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
            </Paper>
          </Group>

          {isOwner && (
            <Center>
              <Button leftIcon={<Plus />} onClick={openAddTaskModal}>
                Adicionar Tarefa
              </Button>
            </Center>
          )}

          <Accordion disableIconRotation multiple>
            {tasks.map((task) => (
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
                        onClick={() => openEditTaskModal(task)}
                      >
                        Editar
                      </Button>
                    )}
                    <Button
                      color="red"
                      variant="outline"
                      leftIcon={<Trash />}
                      size="xs"
                      onClick={() => openDeleteTaskModal(task.id)}
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
    </Container>
  );
}
