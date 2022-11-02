import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateNewAnimal } from "./components/CreateNewAnimal/CreateNewAnimal";
import { LandingPage, SignUp, Home, Profile, Management } from "./views";
import { Details } from "./components/Details/Details";
import { Statistics } from "./components/Statistics/Statistics";

function App() {
  return (
    <div className="bg-white h-full w-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<SignUp />} />
          {/* <Route path="/home" element={<NavBar />} /> */}
          <Route path="/home" element={<Home />} />
          <Route exact path="/home/management" element={<Management />} />
          {/* <Route exact path="/home/newanimal" element={<CreateNewAnimal />} /> */}
          <Route exact path="/home/statistics" element={<Statistics />} />
          <Route exact path="/home/profile" element={<Profile />} />
          <Route exact path="/home/details" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
