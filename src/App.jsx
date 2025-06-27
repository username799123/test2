import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import MaterialInput from "./MaterialInput";
import DetailInput from "./DetailInput";
import OptionAdmin from "./OptionAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectForm />} />
        <Route path="/material" element={<MaterialInput />} />
        <Route path="/detail" element={<DetailInput />} />
        <Route path="/admin" element={<OptionAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
