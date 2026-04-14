import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { updateApplicantStatus } from '@/redux/applicationSlice'

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                dispatch(updateApplicantStatus({ id, status }));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    const getStatusBadge = (status) => {
        if (!status) return <Badge className="bg-gray-400">Pending</Badge>;
        if (status === 'accepted') return <Badge className="bg-green-500">Accepted</Badge>;
        if (status === 'rejected') return <Badge className="bg-red-500">Rejected</Badge>;
        return <Badge className="bg-gray-400">Pending</Badge>;
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        <Avatar className='h-8 w-8'>
                                            <AvatarImage src={item?.applicant?.profile?.profilePhoto} />
                                            <AvatarFallback className='bg-[#ede9fe] text-[#6A38C2] font-bold text-xs'>
                                                {item?.applicant?.fullname?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        {item?.applicant?.fullname}
                                    </div>
                                </TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item.applicant?.profile?.resume
                                        ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a>
                                        : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{getStatusBadge(item?.status)}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => statusHandler('Accepted', item?._id)}
                                            disabled={item?.status === 'accepted'}
                                            className={`px-3 py-1 rounded-md text-sm font-medium text-white transition-colors
                                                ${item?.status === 'accepted'
                                                    ? 'bg-green-300 cursor-not-allowed'
                                                    : 'bg-green-500 hover:bg-green-600'}`}>
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => statusHandler('Rejected', item?._id)}
                                            disabled={item?.status === 'rejected'}
                                            className={`px-3 py-1 rounded-md text-sm font-medium text-white transition-colors
                                                ${item?.status === 'rejected'
                                                    ? 'bg-red-300 cursor-not-allowed'
                                                    : 'bg-red-500 hover:bg-red-600'}`}>
                                            Reject
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable
