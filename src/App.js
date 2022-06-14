import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import AuthProvider from "./contexts/auth";
import Routes from "./Routes";

export default function App() {
  return (
    <AuthProvider>
      <MantineProvider theme={{}}>
        <ModalsProvider>
          <Routes />
        </ModalsProvider>
      </MantineProvider>
    </AuthProvider>
  );
}
