import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '@/utils/axiosInstance';
import { toast } from "sonner";
import { SAVE_JOB_API_END_POINT } from "@/utils/constant";
import { toggleSavedJob } from "@/redux/jobSlice";

const useSaveJob = (job) => {
    const dispatch = useDispatch();
    const { savedJobs } = useSelector(store => store.job);
    const isSaved = savedJobs.some(j => j._id === job?._id);

    const saveHandler = async (e) => {
        if (e) e.stopPropagation();
        if (!job) return;
        try {
            const res = await axiosInstance.post(
                `${SAVE_JOB_API_END_POINT}/saved-jobs/${job._id}`,
                {},
                {}
            );
            if (res.data.success) {
                dispatch(toggleSavedJob(job));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    return { isSaved, saveHandler };
};

export default useSaveJob;
