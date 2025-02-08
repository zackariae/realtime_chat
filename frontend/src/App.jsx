import {Routes, Route, Navigate} from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import SettingPage from "./pages/SettingPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import SigninPage from "./pages/signinPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import { Toaster } from "react-hot-toast"
function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth])

  console.log(authUser);

  if(isCheckingAuth && !authUser){
   return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
   )
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/>:<Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser? <SignupPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser? <SigninPage/> : <Navigate to="/"/>}/>
        <Route path="/profile" element={authUser? <ProfilePage/>: <Navigate to="/login"/>}/>
        <Route path="/settings" element={authUser? <SettingPage/>: <Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
