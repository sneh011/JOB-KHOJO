import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from 'sonner'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const deleteHandler = async (jobId) => {
        if (!window.confirm("Delete this job? All applications for it will also be removed.")) return;
        try {
            const res = await axiosInstance.delete(`${JOB_API_END_POINT}/delete/${jobId}`);
            if (res.data.success) {
                dispatch(setAllAdminJobs(allAdminJobs.filter(j => j._id !== jobId)));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Delete failed");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-36">
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer py-1 hover:text-[#6A38C2]'>
                                            <Eye className='w-4' /><span>Applicants</span>
                                        </div>
                                        <div onClick={() => deleteHandler(job._id)} className='flex items-center gap-2 w-fit cursor-pointer py-1 mt-1 text-red-500 hover:text-red-700'>
                                            <Trash2 className='w-4' /><span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
