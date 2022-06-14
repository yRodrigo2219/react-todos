import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import Login from "./pages/Auth/Login";
import Profile from "./pages/App/Profile";
import Register from "./pages/Auth/Register";

export default function AppRoutes() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/registro"
          element={signed ? <Profile own /> : <Register />}
        />
        <Route path="/" element={signed ? <Profile own /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}
