import { createSlice } from '@reduxjs/toolkit';
const resumeSlice = createSlice({ name: 'resume', initialState: { resumes: [], currentResume: null, isLoading: false }, reducers: { setResumes: (state, action) => { state.resumes = action.payload; }, setCurrentResume: (state, action) => { state.currentResume = action.payload; } } });
export const { setResumes, setCurrentResume } = resumeSlice.actions;
export default resumeSlice.reducer;
