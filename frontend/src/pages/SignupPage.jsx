import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare,User } from 'lucide-react';
import { Link } from 'react-router-dom';

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname || !formData.email || !formData.password) {
      alert("Please fill all the fields");
      return false;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  return (
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
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60 '>Get started with your free account</p>
             
            </div>
          </div>

          {/* form */}
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className='form-control'>
              <label htmlFor="fullname" className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className='relative'>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullname"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter your full name"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />
              </div>
            </div>

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
              disabled={isSigningUp}
            >
              {isSigningUp ? <><Loader2 className="size-5 animate-spin mr-2"/>Loading...</> : "Sign up"}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60 '>Already have an account? <Link href="/login" className='text-primary'>
            Login
            </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage