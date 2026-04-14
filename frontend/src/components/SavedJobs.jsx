import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import { Bookmark, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SavedJobs = () => {
    const { savedJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <button onClick={() => navigate(-1)} className='flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors'>
                    <ArrowLeft className='h-4 w-4' /> Back
                </button>
                <h1 className='font-bold text-xl my-5'>Saved Jobs ({savedJobs.length})</h1>
                {
                    savedJobs.length === 0
                        ? (
                            <div className='flex flex-col items-center justify-center h-64 text-gray-400 gap-3'>
                                <Bookmark className='h-16 w-16' />
                                <p className='text-lg font-medium'>No saved jobs yet</p>
                                <p className='text-sm'>Jobs you save will appear here</p>
                            </div>
                        )
                        : (
                            <div className='grid grid-cols-3 gap-4'>
                                {savedJobs.map((job) => (
                                    <Job key={job._id} job={job} />
                                ))}
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default SavedJobs
