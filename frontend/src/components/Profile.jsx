import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='bg-[#f9f5ff] min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8'>
                {/* Profile Card */}
                <div className='bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden'>
                    {/* Header banner */}
                    <div className='h-24 bg-gradient-to-r from-[#6A38C2] to-[#9b59b6]' />
                    <div className='px-8 pb-8'>
                        <div className='flex justify-between items-start -mt-12'>
                            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <Button onClick={() => setOpen(true)} variant="outline" className='mt-14 flex items-center gap-2 border-[#6A38C2] text-[#6A38C2] hover:bg-[#f0e6ff]'>
                                <Pen className='h-4 w-4' /> Edit Profile
                            </Button>
                        </div>

                        <div className='mt-3'>
                            <h1 className='text-2xl font-bold text-gray-900'>{user?.fullname}</h1>
                            <p className='text-gray-500 mt-1'>{user?.profile?.bio || "No bio added yet"}</p>
                        </div>

                        <div className='mt-5 flex flex-col gap-2'>
                            <div className='flex items-center gap-3 text-gray-600'>
                                <Mail className='h-4 w-4 text-[#6A38C2]' />
                                <span>{user?.email}</span>
                            </div>
                            <div className='flex items-center gap-3 text-gray-600'>
                                <Contact className='h-4 w-4 text-[#6A38C2]' />
                                <span>{user?.phoneNumber}</span>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h2 className='font-semibold text-gray-800 mb-2'>Skills</h2>
                            <div className='flex flex-wrap items-center gap-2'>
                                {user?.profile?.skills?.length > 0
                                    ? user.profile.skills.map((item, index) => (
                                        <Badge key={index} className='bg-[#ede9fe] text-[#6A38C2] hover:bg-[#ddd6fe]'>{item}</Badge>
                                    ))
                                    : <span className='text-gray-400 text-sm'>No skills added</span>
                                }
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h2 className='font-semibold text-gray-800 mb-2'>Resume</h2>
                            {user?.profile?.resume
                                ? (
                                    <a target='_blank' href={user.profile.resume} className='flex items-center gap-2 text-[#6A38C2] hover:underline'>
                                        <FileText className='h-4 w-4' />
                                        {user.profile.resumeOriginalName || "View Resume"}
                                    </a>
                                )
                                : <span className='text-gray-400 text-sm'>No resume uploaded</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Applied Jobs */}
                <div className='bg-white rounded-2xl shadow-md border border-gray-100 mt-6 p-6'>
                    <h2 className='font-bold text-lg text-gray-800 mb-4'>Applied Jobs</h2>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
