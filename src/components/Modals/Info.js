import { Button } from "@mantine/core";

export default function openInfoModal(modals, title, onClose) {
  const id = modals.openModal({
    title,
    children: (
      <Button
        onClick={() => {
          modals.closeModal(id);
          onClose && onClose();
        }}
        mt="md"
      >
        Okay
      </Button>
    ),
  });
}
