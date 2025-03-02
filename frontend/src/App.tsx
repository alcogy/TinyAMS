import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timecard from "./pages/Timecard";
import List from "./pages/List";
import Login from "./pages/Login";
import Detail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/timecard" element={<Timecard />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
