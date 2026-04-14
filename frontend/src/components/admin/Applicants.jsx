import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, ArrowLeft } from 'lucide-react';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div className='bg-[#f9f5ff] min-h-screen'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 py-8'>
                {/* Page Header */}
                <div className='bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] rounded-2xl p-6 mb-6 text-white'>
                    <button onClick={() => navigate(-1)} className='flex items-center gap-1 text-blue-100 hover:text-white text-sm mb-3 transition-colors'>
                        <ArrowLeft className='h-4 w-4' /> Back
                    </button>
                    <div className='flex items-center gap-3'>
                        <div className='bg-white/20 p-2 rounded-lg'>
                            <Users className='h-6 w-6' />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>Applicants</h1>
                            <p className='text-blue-100 text-sm'>{applicants?.applications?.length || 0} total applicants</p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants
