import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Bookmark, Search } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const { savedJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLink = (to, label) => (
        <li>
            <Link
                to={to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive(to)
                    ? 'bg-[#ede9fe] text-[#6A38C2]'
                    : 'text-gray-600 hover:text-[#6A38C2] hover:bg-[#f5f0ff]'}`}>
                {label}
            </Link>
        </li>
    );

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    }

    return (
        <div className='bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                {/* Logo */}
                <Link to="/" className='flex items-center gap-1.5'>
                    <div className='bg-[#6A38C2] p-1.5 rounded-lg'>
                        <Search className='h-4 w-4 text-white' />
                    </div>
                    <h1 className='text-xl font-bold text-gray-900'>Job<span className='text-[#6A38C2]'>Search</span></h1>
                </Link>

                <div className='flex items-center gap-6'>
                    <ul className='flex items-center gap-1'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                {navLink("/admin/companies", "Companies")}
                                {navLink("/admin/jobs", "Jobs")}
                            </>
                        ) : (
                            <>
                                {navLink("/", "Home")}
                                {navLink("/jobs", "Jobs")}
                                {navLink("/browse", "Browse")}
                                {user && (
                                    <li>
                                        <Link to="/saved-jobs"
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive('/saved-jobs')
                                                ? 'bg-[#ede9fe] text-[#6A38C2]'
                                                : 'text-gray-600 hover:text-[#6A38C2] hover:bg-[#f5f0ff]'}`}>
                                            <Bookmark className='h-4 w-4' />
                                            Saved
                                            {savedJobs?.length > 0 && (
                                                <span className='bg-[#6A38C2] text-white text-xs rounded-full px-1.5 py-0.5 leading-none'>
                                                    {savedJobs.length}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>

                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to="/login"><Button variant="outline" className='border-gray-300 text-gray-700 hover:border-[#6A38C2] hover:text-[#6A38C2]'>Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Sign Up</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer h-9 w-9 ring-2 ring-[#6A38C2] ring-offset-1">
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                    <AvatarFallback className='bg-[#6A38C2] text-white text-sm font-bold'>
                                        {user?.fullname?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-0 overflow-hidden" align="end">
                                {/* Header */}
                                <div className='bg-gradient-to-r from-[#6A38C2] to-[#9b59b6] p-4'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className="h-12 w-12 ring-2 ring-white">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback className='bg-white text-[#6A38C2] font-bold text-lg'>
                                                {user?.fullname?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-semibold text-white'>{user?.fullname}</h4>
                                            <p className='text-xs text-purple-200'>{user?.profile?.bio || user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Actions */}
                                <div className='p-2'>
                                    {user.role === 'student' && (
                                        <button onClick={() => navigate('/profile')} className='flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#f5f0ff] hover:text-[#6A38C2] transition-colors'>
                                            <User2 className='h-4 w-4' />
                                            View Profile
                                        </button>
                                    )}
                                    <button onClick={logoutHandler} className='flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors'>
                                        <LogOut className='h-4 w-4' />
                                        Logout
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
