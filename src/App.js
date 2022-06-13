import { MantineProvider } from "@mantine/core";
import AuthProvider from "./contexts/auth";
import Routes from "./Routes";

export default function App() {
  return (
    <AuthProvider>
      <MantineProvider theme={{}}>
        <Routes />
      </MantineProvider>
    </AuthProvider>
  );
}
