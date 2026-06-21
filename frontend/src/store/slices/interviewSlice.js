import { createSlice } from '@reduxjs/toolkit';
const interviewSlice = createSlice({ name: 'interview', initialState: { currentInterview: null, history: [], isLoading: false }, reducers: { setInterview: (state, action) => { state.currentInterview = action.payload; }, clearInterview: (state) => { state.currentInterview = null; } } });
export const { setInterview, clearInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
