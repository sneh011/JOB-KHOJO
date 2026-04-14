import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SAVE_JOB_API_END_POINT } from "@/utils/constant";
import { setSavedJobs } from "@/redux/jobSlice";

const useGetSavedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        if (!user) return;
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${SAVE_JOB_API_END_POINT}/saved-jobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSavedJobs(res.data.savedJobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSavedJobs();
    }, [user]);
};

export default useGetSavedJobs;
