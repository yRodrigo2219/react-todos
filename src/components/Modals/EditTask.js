import { Stack, Checkbox, Button, TextInput, Textarea } from "@mantine/core";

export default function openEditTaskModal(modals, task, handleTaskUpdate) {
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
