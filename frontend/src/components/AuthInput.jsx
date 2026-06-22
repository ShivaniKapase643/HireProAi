import { cn } from '../utils/cn';

/**
 * Form input with a leading icon and orange focus glow.
 *
 * @param {Object} props
 * @param {React.ComponentType} props.icon  lucide-react icon component
 * @param {string} [props.error]            error state styling when truthy
 */
export default function AuthInput({ icon: Icon, error, className, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </span>
      )}
      <input
        className={cn(
          'w-full rounded-xl border-[1.5px] bg-white py-3.5 pl-11 pr-4 text-[15px] text-gray-800 outline-none transition-all placeholder:text-gray-400',
          'focus:border-orange-500 focus:shadow-[0_0_0_3px_rgba(249,115,22,0.12)]',
          error ? 'border-red-300 bg-red-50' : 'border-gray-200',
          className
        )}
        {...props}
      />
    </div>
  );
}
