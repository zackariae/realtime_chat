import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

function Navbar() {
  const {logout, authUser} = useAuthStore();

  return (
    <header className="bg-base-100 border-b border=base-300 fixed w-full top-0 z-40 backdrop-blur-lg ">
      <div className="flex items-center justify-between h-full">
        {/* logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary"/>
            </div>
            <h1 className="text-lg font-bold">Chatty</h1>
          </Link>
        </div>

        {/* links */}
        <div className="flex items-center gap-2">
          {/*settings link*/}
          <Link to="/settings" className="btn btn-sm transition-colors">
            <Settings className="w-4 h-4 "/>
            <span className="hidden sm:inline">Settings</span>
          </Link>
          {/*Profile link*/}
          {authUser && <>
              <Link to="/profile" className="btn btn-sm gap-2">
                <User className="size-5"/>
                <span className="hidden sm:inline">{authUser?.user?.fullname}</span>
              </Link>

              <button onClick={logout} className="btn btn-sm gap-2">
                <LogOut className="size-5"/>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          }
        </div>
      </div>  
    </header>
  )
}

export default Navbar