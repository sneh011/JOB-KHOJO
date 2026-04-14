import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        updateApplicantStatus:(state,action) => {
            const { id, status } = action.payload;
            if(state.applicants?.applications) {
                const app = state.applicants.applications.find(a => a._id === id);
                if(app) app.status = status.toLowerCase();
            }
        }
    }
});
export const {setAllApplicants, updateApplicantStatus} = applicationSlice.actions;
export default applicationSlice.reducer;