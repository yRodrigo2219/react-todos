import { Text, Button } from "@mantine/core";

export default function openErrorModal(modals, title, errorList) {
  const id = modals.openModal({
    title,

    children: (
      <>
        {errorList?.map((err) => (
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
