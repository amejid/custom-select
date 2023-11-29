import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "@/pages/Edit.jsx";
import Home from "@/pages/Home.jsx";
import { UserProvider } from "@/context/UserContext.jsx";
import { SectorsProvider } from "@/context/SectorsContext.jsx";

const App = () => {
  return (
    <SectorsProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/edit" element={<Edit />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </SectorsProvider>
  );
};

export default App;
