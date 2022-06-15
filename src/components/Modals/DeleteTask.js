import { Text } from "@mantine/core";

export default function openDeleteTaskModal(modals, id, handleTaskDelete) {
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
