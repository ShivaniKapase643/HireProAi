import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, GraduationCap, Briefcase, UserCog } from 'lucide-react';
import { registerUser } from '../store/slices/authSlice';
import Select from '../components/Select';
import AuthHeroPanel from '../components/AuthHeroPanel';
import AuthMobileHeader from '../components/AuthMobileHeader';
import AuthInput from '../components/AuthInput';
import TeamCredit from '../components/TeamCredit';
import logoIcon from '../images/logo.png';
import '../styles/auth-animation.css';

const ROLE_OPTIONS = [
  { value: 'student', label: 'Student', description: 'Prepare for placements & interviews', icon: GraduationCap },
  { value: 'tpo', label: 'Placement Officer (TPO)', description: 'Manage student placements', icon: UserCog },
  { value: 'recruiter', label: 'Recruiter', description: 'Hire top talent', icon: Briefcase },
];

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
    <div className="auth-page-register flex min-h-screen bg-gray-900">
      {/* LEFT PANEL - Hero */}
      <AuthHeroPanel
        title="Start Your"
        highlight="Success Story"
        subtitle="with AI-Powered Preparation"
      />

      {/* RIGHT PANEL - Form (consistent with Login) */}
      <div className="form-panel auth-right-panel relative flex w-full items-center justify-center overflow-y-auto p-6 lg:w-2/5 lg:p-8">
        <div className="relative z-10 w-full max-w-md py-8">
          {/* Mobile-only branded header */}
          <AuthMobileHeader title="Start Your" highlight="Success Story" />

          {/* Logo (desktop only — mobile header already shows branding) */}
          <div className="mb-8 hidden text-center lg:block">
            <div className="mb-2 inline-flex items-center gap-2.5">
              <img src={logoIcon} alt="SmartHire AI" className="h-11 w-11 rounded-lg object-contain" />
              <h1 className="font-display text-2xl font-bold text-gray-800">SmartHire AI</h1>
            </div>
            <p className="text-sm text-gray-500">Create your account to get started</p>
          </div>

          {/* Form */}
          <div className="mb-8">
            <h2 className="font-display mb-2 text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="mb-6 text-sm text-gray-500">Join thousands of students preparing for success</p>

            {displayError && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <span className="flex-shrink-0 text-red-500">⚠️</span>
                <span>{displayError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name *</label>
                <AuthInput icon={User} type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g., Shivani Kapase" required />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email *</label>
                <AuthInput icon={Mail} type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Role *</label>
                <Select
                  value={form.role}
                  onChange={(value) => { setForm({ ...form, role: value }); setClientError(''); }}
                  options={ROLE_OPTIONS}
                  placeholder="Select your role"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Password *</label>
                <AuthInput icon={Lock} type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 8 chars, 1 uppercase, 1 number" required />
                {form.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div className={`h-full transition-all ${strength.color}`} style={{ width: `${(strength.score / 5) * 100}%` }}></div>
                      </div>
                      <span className="w-20 text-xs font-medium text-gray-600">{strength.label}</span>
                    </div>
                    <ul className="mt-1.5 space-y-0.5 text-[11px] text-gray-500">
                      <li className={form.password.length >= 8 ? 'text-green-600' : ''}>✓ At least 8 characters</li>
                      <li className={/[A-Z]/.test(form.password) ? 'text-green-600' : ''}>✓ One uppercase letter</li>
                      <li className={/[0-9]/.test(form.password) ? 'text-green-600' : ''}>✓ One number</li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Confirm Password *</label>
                <AuthInput
                  icon={Lock}
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  error={form.confirmPassword && form.password !== form.confirmPassword}
                  required
                />
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit-btn h-[52px] w-full rounded-xl text-base font-semibold tracking-[0.02em] text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign in link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account? <Link to="/login" className="font-medium text-orange-600 hover:text-orange-700">Sign In</Link>
            </p>
          </div>

          {/* Footer */}
          <TeamCredit />
        </div>
      </div>
    </div>
  );
}
