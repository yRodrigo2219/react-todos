import { Stack, Checkbox, Button, TextInput, Textarea } from "@mantine/core";
import { Plus } from "tabler-icons-react";

export default function openAddTaskModal(modals, handleTaskAdd) {
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
