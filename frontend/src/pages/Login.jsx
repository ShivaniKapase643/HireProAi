import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { loginUser, googleLogin } from '../store/slices/authSlice';
import AuthHeroPanel from '../components/AuthHeroPanel';
import AuthMobileHeader from '../components/AuthMobileHeader';
import AuthInput from '../components/AuthInput';
import TeamCredit from '../components/TeamCredit';
import logoIcon from '../images/logo.png';
import logoBg from '../images/success-illustration.png';
import '../styles/auth-animation.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const googleBtnRef = useRef(null);
  const [googleReady, setGoogleReady] = useState(false);

  // Proxy the click from our custom button to Google's hidden rendered button.
  const handleGoogleClick = () => {
    const realBtn = googleBtnRef.current?.querySelector('div[role="button"], button');
    if (realBtn) {
      realBtn.click();
    } else if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const handleCredential = async (response) => {
      const result = await dispatch(googleLogin(response.credential));
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      }
    };

    let cancelled = false;
    const renderButton = () => {
      if (cancelled || !window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredential,
      });
      googleBtnRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: googleBtnRef.current.offsetWidth || 360,
        text: 'continue_with',
      });
      setGoogleReady(true);
    };

    // The GSI script loads async; poll briefly until it's available.
    if (window.google) {
      renderButton();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          renderButton();
        }
      }, 200);
      setTimeout(() => clearInterval(interval), 5000);
      return () => { cancelled = true; clearInterval(interval); };
    }

    return () => { cancelled = true; };
  }, [dispatch, navigate]);

  return (
    <div className="auth-page-login flex min-h-screen bg-gray-900">
      {/* LEFT PANEL - Hero */}
      <AuthHeroPanel
        title="Land Your"
        highlight="Dream Job"
        subtitle="with AI-Powered Prep"
      />

      {/* RIGHT PANEL - Form */}
      <div className="form-panel auth-right-panel relative flex w-full items-center justify-center p-6 lg:w-2/5 lg:p-8">
        <div className="relative z-10 w-full max-w-md">
          {/* Mobile-only branded header */}
          <AuthMobileHeader title="Land Your" highlight="Dream Job" />

          {/* Logo (desktop only — mobile header already shows branding) */}
          <div className="mb-8 hidden text-center lg:block">
            <div className="mb-2 inline-flex items-center gap-2.5">
              <span
                className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${logoBg})` }}
              >
                <img src={logoIcon} alt="SmartHire AI" className="h-11 w-11 rounded-lg object-contain" />
              </span>
              <h1 className="font-display text-2xl font-bold text-gray-800">SmartHire AI</h1>
            </div>
            <p className="text-sm text-gray-500">AI-Powered Placement Preparation</p>
          </div>

          {/* Form */}
          <div className="mb-8">
            <h2 className="font-display mb-2 text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="mb-6 text-sm text-gray-500">Sign in to continue your journey</p>

            {error && (
              <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <AuthInput
                  icon={Mail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
                <AuthInput
                  icon={Lock}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  Remember me
                </label>
                <a href="#" className="font-medium text-orange-600 hover:text-orange-700">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit-btn h-[52px] w-full rounded-xl text-base font-semibold tracking-[0.02em] text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-xs text-gray-400">OR</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Google Login — custom polished button proxies to Google's button */}
            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={!googleReady}
              className="flex h-[52px] w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                <path fill="#EA4335" d="M12 4.75c1.61 0 3.06.55 4.2 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.75 12 4.75z" />
              </svg>
              <span>{googleReady ? 'Continue with Google' : 'Loading Google…'}</span>
            </button>
            {/* Hidden real GSI button (renders the secure credential flow) */}
            <div ref={googleBtnRef} className="absolute -left-[9999px] top-0 h-[52px] w-[320px] overflow-hidden" aria-hidden="true"></div>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-orange-600 hover:text-orange-700">
                Create Account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <TeamCredit />
        </div>
      </div>
    </div>
  );
}
