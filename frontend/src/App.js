import "./App.css";
import Layout from "./components/UI/Layout";
import SearchTemplates from "./components/SearchTemplates/SearchTemplates";
import About from "./components/UI/About";
import TopTemplates from "./components/TopTemplates/TopTemplates";
import { Routes, Route,Navigate } from "react-router-dom";
import Signup from "./components/SignUp/Signup";
import Login from "./components/Login/Login";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/top" element={<TopTemplates />} />
          {!authContext.isLoggedIn && (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          <Route
            path="/"
            element={
              <>
                <SearchTemplates />
                <About />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
