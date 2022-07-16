import React from "react"
import Form from "./Pages/Form"
import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom"
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
