import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import AuthImagePattern from '../components/AuthImagePattern';
import { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const {login, isLoggingIn} = useAuthStore();

  const validateForm = () => {
    if(!formData.email)return toast.error("Please enter your email");
    if(!/\S+@\S+\.\S+/.test(formData.email))return toast.error("Please enter a valid email");
    if(!formData.password)return toast.error("Please enter your password");
    return true;
  }
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) login(formData);
    
  }
  
  return  (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='siz-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome back</h1>
              <p className='text-base-content/60 '>Sign in to your account</p>
             
            </div>
          </div>

          {/* form */}
          <form className="space-y-6" onSubmit={handleLogin}>
         

            <div className='form-control'>
              <label htmlFor="email" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className='relative'>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                type="email"
                id="email"
                className="input input-bordered w-full pl-10"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              </div>
             
            </div>

            <div className='form-control'>
              <label htmlFor="password" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className='relative'>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="input input-bordered w-full pl-10 "
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium text-gray-500 dark:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? <><Loader2 className="size-5 animate-spin mr-2"/>Loading...</> : "Sign in"}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60 '>Don&apos;t have an account?{" "}
              <Link to="/signup" className='text-primary'>
                 Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <AuthImagePattern
        title="Sign up"
        subtitle="Connect with friends and the world around you on Messenger."
      />
    </div>
  )
}

export default SigninPage