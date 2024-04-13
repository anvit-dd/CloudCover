import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import SignupForm from "./components/Auth/signup"
import LoginForm from "./components/Auth/login"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path = "/signup" element = {<SignupForm/>}/>
      <Route path = "/home" element = {<Home/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;