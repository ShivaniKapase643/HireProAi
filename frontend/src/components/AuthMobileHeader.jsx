import circuitTexture from '../images/circuit-texture.png';
import logo from '../images/logo.png';

/**
 * Mobile-only branded header shown above the auth form when the
 * desktop hero panel is hidden (< lg). Brings the navy/orange branding
 * and key stats to small screens so the page never looks bare.
 *
 * @param {Object} props
 * @param {string} props.title      plain part of the headline
 * @param {string} props.highlight  gradient-highlighted part
 */
export default function AuthMobileHeader({ title, highlight }) {
  return (
    <div className="auth-mobile-header relative mb-8 overflow-hidden rounded-3xl p-6 text-center lg:hidden">
      {/* Circuit texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-screen"
        style={{ backgroundImage: `url(${circuitTexture})`, opacity: 0.15 }}
      />
      {/* Navy gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(13,27,62,0.95) 0%, rgba(10,18,40,0.97) 100%)',
        }}
      />

      <div className="relative z-10">
        {/* Brand */}
        <div className="mb-4 inline-flex items-center gap-2.5">
          <img src={logo} alt="SmartHire AI" className="h-10 w-10 rounded-lg object-contain" />
          <span className="font-display text-xl font-bold text-white">SmartHire AI</span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-2xl font-extrabold leading-tight text-white">
          {title} <span className="text-gradient-orange">{highlight}</span>
        </h2>

        {/* Compact stats */}
        <div className="mt-5 flex items-center justify-center gap-6">
          <MobileStat value="10K+" label="Students" />
          <span className="h-8 w-px bg-white/15" />
          <MobileStat value="95%" label="Success" />
          <span className="h-8 w-px bg-white/15" />
          <MobileStat value="500+" label="Companies" />
        </div>
      </div>
    </div>
  );
}

function MobileStat({ value, label }) {
  return (
    <div>
      <div className="text-lg font-extrabold leading-none text-orange-500">{value}</div>
      <div className="mt-1 text-[11px] text-white/65">{label}</div>
    </div>
  );
}
