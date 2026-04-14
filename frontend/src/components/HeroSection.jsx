import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-gradient-to-br from-[#f5f0ff] via-white to-[#fff0ec] py-20'>
            <div className='max-w-4xl mx-auto text-center px-4'>
                <span className='inline-block px-5 py-2 rounded-full bg-[#ede9fe] text-[#6A38C2] font-semibold text-sm mb-6 shadow-sm'>
                    🚀 No. 1 Job Search Website in India
                </span>
                <h1 className='text-5xl font-extrabold text-gray-900 leading-tight mb-4'>
                    Search, Apply &amp; <br />
                    Get Your <span className='text-[#6A38C2]'>Dream Job</span>
                </h1>
                <p className='text-gray-500 text-lg mb-10'>
                    Find your perfect job from thousands of listings across India.
                </p>
                <div className='flex w-full max-w-xl mx-auto shadow-xl border border-gray-200 bg-white rounded-full items-center overflow-hidden'>
                    <input
                        type="text"
                        placeholder='Job title, company or keyword...'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        className='outline-none border-none w-full px-5 py-3 text-gray-700 bg-transparent'
                    />
                    <Button onClick={searchJobHandler} className="rounded-full m-1 px-6 bg-[#6A38C2] hover:bg-[#5b30a6]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
                <div className='flex justify-center gap-6 mt-10 text-sm text-gray-500'>
                    <span>🏢 500+ Companies</span>
                    <span>💼 10,000+ Jobs</span>
                    <span>👥 50,000+ Candidates</span>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
