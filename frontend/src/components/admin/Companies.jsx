import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => { dispatch(setSearchCompanyByText(input)); }, [input]);

    return (
        <div className='bg-[#f9f5ff] min-h-screen'>
            <Navbar />
            <div className='max-w-6xl mx-auto px-4 py-8'>
                {/* Page Header */}
                <div className='bg-gradient-to-r from-[#6A38C2] to-[#9b59b6] rounded-2xl p-6 mb-6 text-white'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-white/20 p-2 rounded-lg'>
                            <Building2 className='h-6 w-6' />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>Companies</h1>
                            <p className='text-purple-200 text-sm'>Manage your registered companies</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4'>
                    <div className='flex items-center justify-between gap-4'>
                        <Input
                            className="max-w-xs border-gray-200 focus:border-[#6A38C2]"
                            placeholder="Search by company name..."
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button onClick={() => navigate("/admin/companies/create")} className='bg-[#6A38C2] hover:bg-[#5b30a6] flex items-center gap-2'>
                            <Plus className='h-4 w-4' /> New Company
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies
