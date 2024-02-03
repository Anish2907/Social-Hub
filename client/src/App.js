import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Messenger from "./pages/Messenger/";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
          <Route path="/messages" element={<Messenger />} />
        </Route>
      </Route>

    </Routes>
  );

}

export default App;
