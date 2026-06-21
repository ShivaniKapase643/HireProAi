import { createSlice } from '@reduxjs/toolkit';
const applicationSlice = createSlice({ name: 'application', initialState: { applications: [], kanban: {}, isLoading: false }, reducers: { setApplications: (state, action) => { state.applications = action.payload; }, setKanban: (state, action) => { state.kanban = action.payload; } } });
export const { setApplications, setKanban } = applicationSlice.actions;
export default applicationSlice.reducer;
