import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import interviewReducer from './slices/interviewSlice';
import resumeReducer from './slices/resumeSlice';
import applicationReducer from './slices/applicationSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
    resume: resumeReducer,
    application: applicationReducer,
    notification: notificationReducer,
  },
});
