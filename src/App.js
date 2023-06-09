import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  
  return (
    <div >
      <HashRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
