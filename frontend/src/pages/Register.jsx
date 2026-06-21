import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../store/slices/authSlice';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student' });
  const [clientError, setClientError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setClientError(''); };

  const validateForm = () => {
    if (!form.name.trim()) return 'Please enter your full name';
    if (form.name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!form.email.trim()) return 'Please enter your email';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address (e.g., name@example.com)';
    if (!form.password) return 'Please enter a password';
    if (form.password.length < 8) return `Password is too short. Must be at least 8 characters (you entered ${form.password.length})`;
    if (!/[A-Z]/.test(form.password)) return 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(form.password)) return 'Password must contain at least one number';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) { setClientError(validationError); return; }
    
    const result = await dispatch(registerUser({ name: form.name, email: form.email, password: form.password, role: form.role }));
    if (result.meta.requestStatus === 'fulfilled') navigate('/dashboard');
  };

  // Password strength indicator
  const passwordStrength = () => {
    const p = form.password;
    if (!p) return { score: 0, label: '', color: 'bg-gray-200' };
    let score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['bg-gray-200', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'];
    return { score, label: labels[score], color: colors[score] };
  };

  const displayError = clientError || error;
  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">SmartHire AI</h1>
          </div>
          <p className="text-gray-500 text-sm">Create your account to get started</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Create Account</h2>

          {displayError && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4 border border-red-200 flex items-start gap-2">
              <span className="text-red-500 flex-shrink-0">⚠️</span>
              <span>{displayError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="e.g., Shivani Kapase" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="you@example.com" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none">
                <option value="student">Student</option>
                <option value="tpo">Placement Officer (TPO)</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="Min 8 chars, 1 uppercase, 1 number" required />
              {form.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${strength.color}`} style={{ width: `${(strength.score / 5) * 100}%` }}></div>
                    </div>
                    <span className="text-xs font-medium text-gray-600 w-20">{strength.label}</span>
                  </div>
                  <ul className="text-[11px] text-gray-500 mt-1.5 space-y-0.5">
                    <li className={form.password.length >= 8 ? 'text-green-600' : ''}>✓ At least 8 characters</li>
                    <li className={/[A-Z]/.test(form.password) ? 'text-green-600' : ''}>✓ One uppercase letter</li>
                    <li className={/[0-9]/.test(form.password) ? 'text-green-600' : ''}>✓ One number</li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} placeholder="Re-enter your password" required />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">Sign In</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">Team TwinTech • Yashvant & Shivani</p>
      </div>
    </div>
  );
}
