import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import Login from "./pages/Auth/Login";
import Profile from "./pages/App/Profile";
import Register from "./pages/Auth/Register";
import Header from "./components/Header";

export default function AppRoutes() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed ? <Header /> : null}

      <Routes>
        <Route
          path="/perfil/:username"
          element={signed ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/registro"
          element={signed ? <Profile own /> : <Register />}
        />
        <Route path="/" element={signed ? <Profile own /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}
