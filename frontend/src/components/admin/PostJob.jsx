import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axiosInstance from '@/utils/axiosInstance'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Briefcase, ArrowLeft } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({ title: "", description: "", requirements: "", salary: "", location: "", jobType: "", experience: "", position: 0, companyId: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(c => c.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axiosInstance.post(`${JOB_API_END_POINT}/post`, input, { headers: { 'Content-Type': 'application/json' } });
            if (res.data.success) { toast.success(res.data.message); navigate("/admin/jobs"); }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to post job");
        } finally { setLoading(false); }
    }

    const fields = [
        { label: "Job Title", name: "title", placeholder: "e.g. Frontend Developer" },
        { label: "Description", name: "description", placeholder: "Brief job description" },
        { label: "Requirements", name: "requirements", placeholder: "React, Node.js (comma separated)" },
        { label: "Salary (LPA)", name: "salary", placeholder: "e.g. 12" },
        { label: "Location", name: "location", placeholder: "e.g. Bangalore" },
        { label: "Job Type", name: "jobType", placeholder: "Full Time / Part Time" },
        { label: "Experience (yrs)", name: "experience", placeholder: "e.g. 2" },
        { label: "No. of Positions", name: "position", type: "number", placeholder: "e.g. 3" },
    ];

    return (
        <div className='bg-[#f9f5ff] min-h-screen'>
            <Navbar />
            <div className='max-w-3xl mx-auto px-4 py-10'>
                <button onClick={() => navigate("/admin/jobs")} className='flex items-center gap-1 text-sm text-gray-500 hover:text-[#F83002] mb-6 transition-colors'>
                    <ArrowLeft className='h-4 w-4' /> Back to Jobs
                </button>

                <div className='bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden'>
                    <div className='bg-gradient-to-r from-[#F83002] to-[#ff6b35] p-6'>
                        <div className='flex items-center gap-3 text-white'>
                            <div className='bg-white/20 p-2 rounded-lg'>
                                <Briefcase className='h-5 w-5' />
                            </div>
                            <div>
                                <h1 className='text-xl font-bold'>Post a New Job</h1>
                                <p className='text-orange-100 text-sm'>Fill in the details to create a job listing</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className='p-6'>
                        <div className='grid grid-cols-2 gap-4'>
                            {fields.map(f => (
                                <div key={f.name}>
                                    <Label className='text-gray-700 font-medium'>{f.label}</Label>
                                    <Input type={f.type || "text"} name={f.name} value={input[f.name]} onChange={changeEventHandler} placeholder={f.placeholder} className='mt-1 border-gray-200 focus:border-[#F83002]' />
                                </div>
                            ))}
                            {companies.length > 0 && (
                                <div>
                                    <Label className='text-gray-700 font-medium'>Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="mt-1 border-gray-200">
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map(c => (
                                                    <SelectItem key={c._id} value={c.name.toLowerCase()}>{c.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {companies.length === 0 && (
                            <p className='text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 mt-4'>
                                ⚠️ Please register a company first before posting a job.
                            </p>
                        )}

                        <div className='mt-6'>
                            {loading
                                ? <Button className="w-full bg-[#F83002]"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
                                : <Button type="submit" className="w-full bg-[#F83002] hover:bg-[#d42a00]">Post Job</Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob
