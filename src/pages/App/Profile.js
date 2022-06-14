import {
  Container,
  Stack,
  Space,
  Accordion,
  Checkbox,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { Trash, Edit } from "tabler-icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileInfo from "../../components/ProfileInfo";
import { useAuth } from "../../contexts/auth";
import { getUserToDos } from "../../services/api";

export const Ac = Accordion;

export default function ProfilePage({ own }) {
  const { user } = useAuth();
  const { username } = useParams();
  const [isOwner, setIsOwner] = useState(own);
  const [tasks, setTasks] = useState([]);

  async function handleUserTodos(username) {
    const todos = await getUserToDos(username);

    setTasks(todos);
  }

  useEffect(() => {
    if (username) {
      setIsOwner(username === user?.username);
      handleUserTodos(username);
    } else {
      setIsOwner(own);
      handleUserTodos(user?.username);
    }
  }, [username, own, user]);

  // const tasks = [
  //   {
  //     id: 1,
  //     name: "Task 1",
  //     description: "Descrição da task 1",
  //     isDone: false,
  //   },
  //   {
  //     id: 2,
  //     name: "Task 2",
  //     description: "Descrição da task 2",
  //     isDone: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Task 3",
  //     description: "Descrição da task 3",
  //     isDone: false,
  //   },
  // ];

  return (
    <Container size="xl">
      <Container size="lg">
        <Stack spacing="xl">
          <Space h="md" />

          <ProfileInfo name="Rodrigo Carmo" username="y2219" />

          <Accordion disableIconRotation multiple>
            {tasks.map((task) => (
              <Accordion.Item
                key={task.id}
                label={task.name}
                icon={
                  <Checkbox
                    size="md"
                    radius="xl"
                    checked={task.isDone}
                    onChange={(e) => alert(e)}
                    onClick={(e) => e.stopPropagation()}
                  />
                }
              >
                <Text>{task.description}</Text>
                {isOwner ? (
                  <Group position="right">
                    {task.isDone ? null : (
                      <Button variant="outline" leftIcon={<Edit />} size="xs">
                        Editar
                      </Button>
                    )}
                    <Button
                      color="red"
                      variant="outline"
                      leftIcon={<Trash />}
                      size="xs"
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
