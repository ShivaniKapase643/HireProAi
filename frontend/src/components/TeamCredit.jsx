import twintechLogo from '../images/twintech-logo-light.png';

/**
 * Footer credit for Team TwinTech.
 * A polished branded pill: light TwinTech logo in a black-bordered circle
 * + team name, with a high-contrast orange gradient so the full name reads.
 */
export default function TeamCredit({ className = '' }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur">
        <img
          src={twintechLogo}
          alt="TwinTech"
          title="Team TwinTech"
          className="h-12 w-12 rounded-full border-2 border-gray-900 object-cover bg-white"
        />
        <span className="font-display text-base font-semibold text-gray-700">
          Team TwinTech <span className="mx-0.5 text-gray-300">•</span>{' '}
          <span
            className="font-extrabold"
            style={{
              background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Yashvant &amp; Shivani
          </span>
        </span>
      </div>
    </div>
  );
}
