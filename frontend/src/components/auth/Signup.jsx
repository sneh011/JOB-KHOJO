import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { Loader2, Mail, Lock, Phone, User, Briefcase, ImagePlus } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({ fullname: "", email: "", phoneNumber: "", password: "", role: "", file: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.fullname || !input.email || !input.password || !input.role) { toast.error("Please fill all fields"); return; }
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, { headers: { 'Content-Type': "multipart/form-data" }, withCredentials: true });
      if (res.data.success) { toast.success(res.data.message); navigate("/login"); }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally { setLoading(false); }
  }

  useEffect(() => { if (user) navigate("/"); }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0e6ff] via-white to-[#ffe8e0] flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold'>Job<span className='text-[#6A38C2]'>Search</span></h1>
          <p className='text-gray-500 mt-1 text-sm'>Create your account and find your dream job</p>
        </div>

        <div className='bg-white rounded-2xl shadow-2xl shadow-purple-100 border border-gray-100 p-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Sign Up</h2>

          <form onSubmit={submitHandler} className='space-y-4'>
            <div>
              <Label className='text-gray-700 font-medium'>Full Name</Label>
              <div className='relative mt-1'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="John Doe" className='pl-10 h-11 border-gray-200' />
              </div>
            </div>

            <div>
              <Label className='text-gray-700 font-medium'>Email</Label>
              <div className='relative mt-1'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="you@example.com" className='pl-10 h-11 border-gray-200' />
              </div>
            </div>

            <div>
              <Label className='text-gray-700 font-medium'>Phone Number</Label>
              <div className='relative mt-1'>
                <Phone className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="9876543210" className='pl-10 h-11 border-gray-200' />
              </div>
            </div>

            <div>
              <Label className='text-gray-700 font-medium'>Password</Label>
              <div className='relative mt-1'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="••••••••" className='pl-10 h-11 border-gray-200' />
              </div>
            </div>

            <div className='flex items-center justify-between gap-4'>
              <div className='flex-1'>
                <Label className='text-gray-700 font-medium mb-2 block'>I am a</Label>
                <RadioGroup className="flex gap-3">
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all ${input.role === 'student' ? 'border-[#6A38C2] bg-[#f0e6ff]' : 'border-gray-200'}`}>
                    <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className='w-4 h-4 accent-[#6A38C2]' />
                    <span className='text-sm font-medium'>Student</span>
                  </label>
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all ${input.role === 'recruiter' ? 'border-[#6A38C2] bg-[#f0e6ff]' : 'border-gray-200'}`}>
                    <Input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className='w-4 h-4 accent-[#6A38C2]' />
                    <Briefcase className='h-4 w-4 text-gray-500' />
                    <span className='text-sm font-medium'>Recruiter</span>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <Label className='text-gray-700 font-medium mb-2 block'>Photo</Label>
                <label className='flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#6A38C2] transition-colors'>
                  <ImagePlus className='h-4 w-4 text-gray-400' />
                  <span className='text-xs text-gray-500'>{input.file ? input.file.name?.slice(0, 10) + '...' : 'Upload'}</span>
                  <input type="file" accept="image/*" onChange={changeFileHandler} className='hidden' />
                </label>
              </div>
            </div>

            {loading
              ? <Button className="w-full h-11 bg-[#6A38C2] hover:bg-[#5b30a6]"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
              : <Button type="submit" className="w-full h-11 bg-[#6A38C2] hover:bg-[#5b30a6] text-base font-semibold">Create Account</Button>
            }
          </form>

          <p className='text-center text-sm text-gray-500 mt-6'>
            Already have an account?{" "}
            <Link to="/login" className='text-[#6A38C2] font-semibold hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
