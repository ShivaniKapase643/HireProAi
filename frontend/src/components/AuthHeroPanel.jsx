import heroBackground from '../images/hero-background.png';
import circuitTexture from '../images/circuit-texture.png';
import successIllustration from '../images/success-illustration.png';

/**
 * Left hero panel shared between Login and Register.
 * Layers: hero photo -> circuit texture overlay -> deep navy gradient.
 *
 * @param {Object} props
 * @param {string} props.title       plain part of the headline
 * @param {string} props.highlight   gradient-highlighted part of the headline
 * @param {string} props.subtitle    supporting line under the headline
 */
export default function AuthHeroPanel({ title, highlight, subtitle }) {
  return (
    <div className="hero-panel relative hidden overflow-hidden lg:block lg:w-3/5">
      {/* Base hero photo */}
      <img
        src={heroBackground}
        alt="Students achieving career success"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Circuit texture overlay for depth */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-screen"
        style={{ backgroundImage: `url(${circuitTexture})`, opacity: 0.12 }}
      />

      {/* Deep navy gradient so orange text pops */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(13,27,62,0.82) 0%, rgba(10,18,40,0.90) 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center p-12">
        <div className="max-w-lg">
          <h1
            className="font-display font-extrabold leading-[1.1] text-white"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            {title}{' '}
            <span className="text-gradient-orange">{highlight}</span>
          </h1>
          <p className="mt-5 text-xl text-white/80">{subtitle}</p>

          {/* Glassmorphism stat cards */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <StatCard value="10K+" label="Students" floatClass="float-card-1" />
            <StatCard value="95%" label="Success Rate" floatClass="float-card-2" />
            <StatCard value="500+" label="Companies" floatClass="float-card-3" />
          </div>
        </div>
      </div>

      {/* Floating success card (bottom-right) */}
      <div className="absolute bottom-8 right-8 float-card-2">
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-3 pr-5 backdrop-blur-md">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15">
            <img
              src={successIllustration}
              alt="Offer letter"
              className="h-11 w-11 rounded-lg object-cover mix-blend-screen"
            />
          </span>
          <div>
            <div className="text-sm font-bold text-white">500+ Offer Letters</div>
            <div className="text-xs text-white/65">Placed successfully 🎉</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, floatClass }) {
  return (
    <div
      className={`rounded-2xl border border-white/15 bg-white/[0.08] px-5 py-5 backdrop-blur-xl transition hover:bg-white/[0.14] ${floatClass}`}
    >
      <div className="text-[28px] font-extrabold leading-none text-orange-500">{value}</div>
      <div className="mt-1.5 text-xs text-white/65">{label}</div>
    </div>
  );
}
