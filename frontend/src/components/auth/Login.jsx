import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '@/utils/axiosInstance'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setToken } from '@/redux/authSlice'
import { Loader2, Mail, Lock, Briefcase } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.role) { toast.error("Please fill all fields"); return; }
    try {
      setLoading(true);
      const res = await axiosInstance.post(`${USER_API_END_POINT}/login`, input, { headers: { "Content-Type": "application/json" } });
      if (res.data.success) { 
        dispatch(setUser(res.data.user)); 
        dispatch(setToken(res.data.token));
        toast.success(res.data.message); 
        navigate("/"); 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  }

  useEffect(() => { if (user) navigate("/"); }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0e6ff] via-white to-[#ffe8e0] flex items-center justify-center px-4'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold'>Job<span className='text-[#6A38C2]'>Search</span></h1>
          <p className='text-gray-500 mt-1 text-sm'>Welcome back! Sign in to continue</p>
        </div>

        <div className='bg-white rounded-2xl shadow-2xl shadow-purple-100 border border-gray-100 p-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Login</h2>

          <form onSubmit={submitHandler} className='space-y-4'>
            <div>
              <Label className='text-gray-700 font-medium'>Email</Label>
              <div className='relative mt-1'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="you@example.com" className='pl-10 h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]' />
              </div>
            </div>

            <div>
              <Label className='text-gray-700 font-medium'>Password</Label>
              <div className='relative mt-1'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="••••••••" className='pl-10 h-11 border-gray-200 focus:border-[#6A38C2]' />
              </div>
            </div>

            <div>
              <Label className='text-gray-700 font-medium mb-2 block'>I am a</Label>
              <RadioGroup className="flex gap-4">
                <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${input.role === 'student' ? 'border-[#6A38C2] bg-[#f0e6ff]' : 'border-gray-200'}`}>
                  <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className='w-4 h-4 accent-[#6A38C2]' />
                  <span className='text-sm font-medium'>Student</span>
                </label>
                <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${input.role === 'recruiter' ? 'border-[#6A38C2] bg-[#f0e6ff]' : 'border-gray-200'}`}>
                  <Input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className='w-4 h-4 accent-[#6A38C2]' />
                  <Briefcase className='h-4 w-4 text-gray-500' />
                  <span className='text-sm font-medium'>Recruiter</span>
                </label>
              </RadioGroup>
            </div>

            {loading
              ? <Button className="w-full h-11 bg-[#6A38C2] hover:bg-[#5b30a6]"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
              : <Button type="submit" className="w-full h-11 bg-[#6A38C2] hover:bg-[#5b30a6] text-base font-semibold">Login</Button>
            }
          </form>

          <p className='text-center text-sm text-gray-500 mt-6'>
            Don't have an account?{" "}
            <Link to="/signup" className='text-[#6A38C2] font-semibold hover:underline'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
