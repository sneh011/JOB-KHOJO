import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowLeft } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create company");
        }
    }

    return (
        <div className='bg-[#f9f5ff] min-h-screen'>
            <Navbar />
            <div className='max-w-xl mx-auto px-4 py-10'>
                <button onClick={() => navigate("/admin/companies")} className='flex items-center gap-1 text-sm text-gray-500 hover:text-[#6A38C2] mb-6 transition-colors'>
                    <ArrowLeft className='h-4 w-4' /> Back to Companies
                </button>

                <div className='bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden'>
                    <div className='bg-gradient-to-r from-[#6A38C2] to-[#9b59b6] p-6'>
                        <div className='flex items-center gap-3 text-white'>
                            <div className='bg-white/20 p-2 rounded-lg'>
                                <Building2 className='h-5 w-5' />
                            </div>
                            <div>
                                <h1 className='text-xl font-bold'>Register Company</h1>
                                <p className='text-purple-200 text-sm'>You can update details in the next step</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-6'>
                        <Label className='text-gray-700 font-medium'>Company Name</Label>
                        <Input
                            type="text"
                            className="my-2 h-11 border-gray-200 focus:border-[#6A38C2]"
                            placeholder="e.g. Google, Microsoft, Infosys"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <div className='flex items-center gap-3 mt-6'>
                            <Button variant="outline" onClick={() => navigate("/admin/companies")} className='flex-1'>Cancel</Button>
                            <Button onClick={registerNewCompany} className='flex-1 bg-[#6A38C2] hover:bg-[#5b30a6]'>Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
