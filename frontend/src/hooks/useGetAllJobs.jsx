import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axiosInstance from '@/utils/axiosInstance'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    const { searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth); // 🔥 ADD THIS

    useEffect(() => {

        const fetchAllJobs = async () => {
            try {
                const res = await axiosInstance.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    {}
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }

            } catch (error) {
                console.log("Ignore if not logged in"); // 🔥 safe
            }
        }

        if (user) { // 🔥 IMPORTANT CONDITION
            fetchAllJobs();
        }

    }, [user, searchedQuery]);

}

export default useGetAllJobs;