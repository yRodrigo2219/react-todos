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

export const Ac = Accordion;

export default function ProfilePage({ own }) {
  const { user, logout } = useAuth();
  const { username } = useParams();
  const [isOwner, setIsOwner] = useState(own);
  const [tasks, setTasks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [updateTasks, setUpdateTasks] = useState(false);
  const modals = useModals();

  useEffect(() => {
    if (updateTasks) {
      handleUserTodos(user.username);
    }
    setUpdateTasks(false);
  }, [updateTasks]);

  useEffect(() => {
    if (username) {
      setIsOwner(username === user?.username);
      handleUserTodos(username);
      handleUserInfo(username);
    } else {
      setIsOwner(own);
      handleUserTodos(user.username);
      handleUserInfo(user.username);
    }
  }, [username, own, user]);

  async function handleTaskAdd(newTask) {
    try {
      await createToDo(user.username, newTask);
      setUpdateTasks(true);
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal("Erro ao adicionar tarefa", errorList);
    }
  }

  async function handleTaskUpdate(id, change) {
    try {
      await updateToDo(user.username, id, change);
      setUpdateTasks(true);
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal("Erro ao modificar tarefa", errorList);
    }
  }

  async function handleTaskDelete(id) {
    try {
      await deleteToDo(user.username, id);
      setUpdateTasks(true);
    } catch (error) {
      const errorList = error.response.data.errors;
      openErrorModal("Erro ao deletar tarefa", errorList);
    }
  }

  async function handleUserInfo(username) {
    try {
      const info = await getUserInfo(username);

      setUserInfo(info);
    } catch (error) {
      if (error.response.status === 401) logout();
      else alert("Usuário inválido!");
    }
  }

  async function handleUserTodos(username) {
    try {
      const todos = await getUserToDos(username);

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
              is_done: e.target[2].checked,
            });
          }}
        >
          <Stack>
            <TextInput label="Título" placeholder="Título da tarefa" />
            <Textarea
              label="Descrição"
              placeholder="Descreva sua tarefa aqui"
            />
            <Checkbox label="É pública?" />
            <Checkbox label="Já está concluída?" />
            <Button
              fullWidth
              onClick={() => {
                modals.closeModal(id);
              }}
              mt="md"
              type="submit"
            >
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
          }}
        >
          <Stack>
            <TextInput
              label="Título"
              placeholder="Título da tarefa"
              defaultValue={task.title}
            />
            <Textarea
              label="Descrição"
              placeholder="Descreva sua tarefa aqui"
              defaultValue={task.description}
            />
            <Checkbox label="É pública?" defaultChecked={task.is_public} />
            <Button
              fullWidth
              onClick={() => {
                modals.closeModal(id);
              }}
              mt="md"
              type="submit"
            >
              Confirmar Edição
            </Button>
          </Stack>
        </form>
      ),
    });
  }

  return (
    <Container size="xl">
      <Container size="lg">
        <Stack spacing="xl">
          <Space h="md" />

          {userInfo && (
            <ProfileInfo name={userInfo.name} username={userInfo.username} />
          )}

          <Center>
            <Button leftIcon={<Plus />} onClick={openAddTaskModal}>
              Adicionar Tarefa
            </Button>
          </Center>

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
