import React from "react"
import Form from "./Pages/Form"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom"
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
