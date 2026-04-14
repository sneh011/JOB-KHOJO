import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    const { searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth); // 🔥 ADD THIS

    useEffect(() => {

        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,
                    { withCredentials: true }
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