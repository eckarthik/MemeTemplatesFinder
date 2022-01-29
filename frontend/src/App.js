import "./App.css";
import Layout from "./components/UI/Layout";
import SearchTemplates from "./components/SearchTemplates/SearchTemplates";
import About from "./components/UI/About";
import TopTemplates from "./components/TopTemplates/TopTemplates";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp/Signup";
import Login from "./components/Login/Login";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/top" element={<TopTemplates />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <SearchTemplates />
                <About />
              </>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
