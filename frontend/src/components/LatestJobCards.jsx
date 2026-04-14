import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useNavigate } from 'react-router-dom'
import { Bookmark, BookmarkCheck, MapPin, Briefcase, BadgeDollarSign } from 'lucide-react'
import useSaveJob from '@/hooks/useSaveJob'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const { isSaved, saveHandler } = useSaveJob(job);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl hover:border-[#7209b7] transition-all'>
                    <div className='flex items-start justify-between'>
                        <div>
                            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                            <p className='text-sm text-gray-500'>India</p>
                        </div>
                        <button onClick={saveHandler} className='text-gray-400 hover:text-[#7209b7] transition-colors'>
                            {isSaved ? <BookmarkCheck className='h-5 w-5 text-[#7209b7]' /> : <Bookmark className='h-5 w-5' />}
                        </button>
                    </div>
                    <div className='flex items-center gap-2 my-2'>
                        <Avatar className='h-10 w-10'>
                            <AvatarImage src={job?.company?.logo} />
                            <AvatarFallback className='bg-[#ede9fe] text-[#6A38C2] font-bold'>
                                {job?.company?.name?.charAt(0).toUpperCase() || 'C'}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                        <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
                    </div>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" side="top">
                <div className='space-y-3'>
                    <div>
                        <h2 className='font-bold text-base'>{job?.title}</h2>
                        <p className='text-sm text-gray-500'>{job?.company?.name}</p>
                    </div>
                    <div className='space-y-1.5 text-sm text-gray-600'>
                        <div className='flex items-center gap-2'>
                            <MapPin className='h-4 w-4 text-[#7209b7]' />
                            <span>{job?.location}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Briefcase className='h-4 w-4 text-[#7209b7]' />
                            <span>{job?.jobType} · {job?.experienceLevel} yrs exp</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <BadgeDollarSign className='h-4 w-4 text-[#7209b7]' />
                            <span>{job?.salary} LPA</span>
                        </div>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
                    <div className='flex gap-2 pt-1'>
                        <Button onClick={() => navigate(`/description/${job._id}`)} className='flex-1 bg-[#7209b7] hover:bg-[#5f32ad] text-sm h-8'>
                            View Details
                        </Button>
                        <Button onClick={saveHandler} variant="outline" className={`flex-1 text-sm h-8 ${isSaved ? 'border-[#7209b7] text-[#7209b7]' : ''}`}>
                            {isSaved ? 'Saved ✓' : 'Save'}
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default LatestJobCards
