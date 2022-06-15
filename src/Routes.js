// React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Custom Components
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Unauthorized from "./pages/Auth/Unauthorized";
import Profile from "./pages/App/Profile";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";

// Hooks & Misc.
import { useAuth } from "./contexts/auth";

export default function AppRoutes() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed ? <Header /> : null}

      <Routes>
        <Route
          path="/perfil/:username"
          element={signed ? <Profile /> : <Unauthorized />}
        />
        <Route
          path="/registro"
          element={signed ? <Profile own /> : <Register />}
        />
        <Route path="/" element={signed ? <Profile own /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
