// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Custom Components
import Login from "./pages/Auth/Login";
import Profile from "./pages/App/Profile";
import Register from "./pages/Auth/Register";
import Header from "./components/Header";

// Hooks & Misc.
import { useAuth } from "./contexts/auth";

export default function AppRoutes() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed ? <Header /> : null}

      <Routes>
        <Route path="/perfil/:username" element={signed ? <Profile /> : null} />
        <Route
          path="/registro"
          element={signed ? <Profile own /> : <Register />}
        />
        <Route path="/" element={signed ? <Profile own /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}
