import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateNewAnimal } from "./components/CreateNewAnimal/CreateNewAnimal";
import { LandingPage } from "./views";
import { Home } from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import { SignUp } from "./components/SignUp/SignUp";
import { Management } from "./components/Management/Management";

function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<SignUp />} />
          {/* <Route path="/home" element={<NavBar />} /> */}
          <Route path="/home" element={<Home />} />
          <Route exact path="/home/management" element={<Management />} />
          <Route exact path="/home/newanimal" element={<CreateNewAnimal />} />
          <Route exact path="/home/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
