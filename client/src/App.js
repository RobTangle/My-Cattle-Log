import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  LandingPage,
  SignUp,
  Home,
  Profile,
  Management,
  Details,
  Team,
  Statistics
} from "./views";



function App() {
  return (
    <div className="bg-white h-full w-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route exact path="/home/management" element={<Management />} />
          <Route exact path="/home/statistics" element={<Statistics />} />
          <Route exact path="/home/profile" element={<Profile />} />
          <Route exact path="/details/:id" element={<Details />} />
          <Route exact path="/team" element={<Team />} />
          {/* Page 404 */}
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
