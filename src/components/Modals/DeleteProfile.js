import { Text } from "@mantine/core";

export default function openDeleteProfile(modals, onDelete) {
  modals.openConfirmModal({
    title: "Deletar perfil",
    centered: true,
    children: (
      <Text size="sm">
        Tem certeza que quer deletar o seu perfil? Essa ação não é reversivel!
      </Text>
    ),
    labels: {
      confirm: "Deletar perfil",
      cancel: "Continuar aproveitando",
    },
    confirmProps: { color: "red" },
    onConfirm: onDelete,
  });
}
