import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Interview from './pages/Interview';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import JobTracker from './pages/JobTracker';
import Analytics from './pages/Analytics';
import CareerRecommendations from './pages/CareerRecommendations';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import TPOPanel from './pages/TPOPanel';
import RecruiterPanel from './pages/RecruiterPanel';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/resume" element={<ResumeAnalyzer />} />
              <Route path="/jobs" element={<JobTracker />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/career" element={<CareerRecommendations />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/*" element={<AdminPanel />} />
              <Route path="/tpo/*" element={<TPOPanel />} />
              <Route path="/recruiter/*" element={<RecruiterPanel />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
