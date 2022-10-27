import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateNewAnimal } from "./components/CreateNewAnimal";
import { LandingPage } from "./components/LandingPage";
import { NavBar } from "./components/NavBar/NavBar";
import { CardContainer } from "./components/CardContainer";
import { Home } from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import { SignUp } from "./components/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<SignUp />} />
          {/* <Route path="/home" element={<NavBar />} /> */}
          <Route path="/home" element={<Home />} />
          <Route exact path="/home/list" element={<CardContainer />} />
          <Route exact path="/home/newanimal" element={<CreateNewAnimal />} />
          <Route exact path="/home/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
