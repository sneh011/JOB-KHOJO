import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axiosInstance from '@/utils/axiosInstance'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({ name: "", description: "", website: "", location: "", file: null });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) formData.append("file", input.file);
        try {
            setLoading(true);
            const res = await axiosInstance.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) { toast.success(res.data.message); navigate("/admin/companies"); }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Update failed");
        } finally { setLoading(false); }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null
        });
    }, [singleCompany]);

    const fields = [
        { label: "Company Name", name: "name", placeholder: "e.g. Google" },
        { label: "Description", name: "description", placeholder: "Brief description" },
        { label: "Website", name: "website", placeholder: "https://example.com" },
        { label: "Location", name: "location", placeholder: "e.g. Bangalore, India" },
    ];

    return (
        <div className='bg-[#f9f5ff] min-h-screen'>
            <Navbar />
            <div className='max-w-2xl mx-auto px-4 py-10'>
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
                                <h1 className='text-xl font-bold'>Company Setup</h1>
                                <p className='text-purple-200 text-sm'>Update your company information</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={submitHandler} className='p-6'>
                        <div className='grid grid-cols-2 gap-4'>
                            {fields.map(f => (
                                <div key={f.name}>
                                    <Label className='text-gray-700 font-medium'>{f.label}</Label>
                                    <Input type="text" name={f.name} value={input[f.name]} onChange={changeEventHandler} placeholder={f.placeholder} className='mt-1 border-gray-200 focus:border-[#6A38C2]' />
                                </div>
                            ))}
                            <div>
                                <Label className='text-gray-700 font-medium'>Company Logo</Label>
                                <Input type="file" accept="image/*" onChange={changeFileHandler} className='mt-1 border-gray-200' />
                            </div>
                        </div>
                        <div className='mt-6'>
                            {loading
                                ? <Button className="w-full bg-[#6A38C2]"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
                                : <Button type="submit" className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Save Changes</Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup
