import {Routes, Route, Navigate} from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import SettingsPage from "./pages/SettingPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import SigninPage from "./pages/SigninPage.jsx"
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import { Toaster } from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore.js"
function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore();


  useEffect(() => {
    checkAuth();
  },[checkAuth])


  if(isCheckingAuth && !authUser){
   return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
   )
  }

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/>:<Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser? <SignupPage/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser? <SigninPage/> : <Navigate to="/"/>}/>
        <Route path="/profile" element={authUser? <ProfilePage/>: <Navigate to="/login"/>}/>
        <Route path="/settings" element={authUser? <SettingsPage/>: <Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
