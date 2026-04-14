import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const query = searchedQuery.toLowerCase();
            const salaryRange = searchedQuery.match(/^(\d+)-(\d+)\s*lpa$/i);
            const salaryAbove = searchedQuery.match(/^(\d+)\+\s*lpa$/i);

            const filteredJobs = allJobs.filter((job) => {
                if (salaryRange) {
                    const min = Number(salaryRange[1]);
                    const max = Number(salaryRange[2]);
                    return job.salary >= min && job.salary <= max;
                }
                if (salaryAbove) {
                    const min = Number(salaryAbove[1]);
                    return job.salary >= min;
                }
                return (
                    job.title.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    job.location.toLowerCase().includes(query)
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='bg-[#f9f5ff] min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4 pb-10'>
                <div className='flex gap-5'>
                    <div className='w-72 shrink-0'>
                        <FilterCard />
                    </div>
                    {filterJobs.length <= 0
                        ? (
                            <div className='flex-1 flex items-center justify-center h-64 text-gray-400 text-lg'>
                                No jobs found matching your search.
                            </div>
                        )
                        : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}>
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
