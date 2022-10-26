import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Form } from "./components/Form";
import { LandingPage } from "./components/LandingPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/newanimal" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
