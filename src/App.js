import { MantineProvider } from "@mantine/core";
import Routes from "./Routes";

export default function App() {
  return (
    <MantineProvider theme={{}}>
      <Routes />
    </MantineProvider>
  );
}
