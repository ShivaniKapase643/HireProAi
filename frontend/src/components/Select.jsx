import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

/**
 * Attractive, accessible Select dropdown.
 *
 * @param {Object}   props
 * @param {string}   props.value          Currently selected value
 * @param {Function} props.onChange       Called with the new value
 * @param {Array}    props.options        [{ value, label, description?, icon? }]
 * @param {string}   [props.placeholder]  Placeholder when nothing selected
 * @param {string}   [props.className]    Extra classes for the button
 */
export default function Select({ value, onChange, options = [], placeholder = 'Select an option', className }) {
  const selected = options.find((o) => o.value === value) || null;

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          {/* Trigger button */}
          <ListboxButton
            className={cn(
              'group relative w-full cursor-pointer rounded-lg border bg-white px-4 py-2.5 text-left outline-none transition-all',
              'flex items-center gap-3',
              open
                ? 'border-orange-500 ring-2 ring-orange-500/30 shadow-sm'
                : 'border-gray-200 hover:border-orange-300',
              className
            )}
          >
            {selected?.icon && (
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-orange-50 text-orange-500">
                <selected.icon size={18} />
              </span>
            )}
            <span className="flex-1 min-w-0">
              {selected ? (
                <span className="block truncate font-medium text-gray-800">{selected.label}</span>
              ) : (
                <span className="block truncate text-gray-400">{placeholder}</span>
              )}
              {selected?.description && (
                <span className="block truncate text-xs text-gray-400">{selected.description}</span>
              )}
            </span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex-shrink-0 text-gray-400 group-hover:text-orange-500"
            >
              <ChevronDown size={18} />
            </motion.span>
          </ListboxButton>

          {/* Options panel */}
          <AnimatePresence>
            {open && (
              <ListboxOptions
                static
                as={motion.ul}
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="absolute z-50 mt-2 w-full origin-top overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-gray-200/60 focus:outline-none"
              >
                {options.map((option, i) => (
                  <ListboxOption key={option.value} value={option.value} as="li">
                    {({ focus, selected: isSelected }) => (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                        className={cn(
                          'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                          focus ? 'bg-orange-50' : 'bg-transparent',
                          isSelected && 'bg-orange-50/60'
                        )}
                      >
                        {option.icon && (
                          <span
                            className={cn(
                              'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md transition-colors',
                              isSelected || focus ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
                            )}
                          >
                            <option.icon size={18} />
                          </span>
                        )}
                        <span className="flex-1 min-w-0">
                          <span
                            className={cn(
                              'block truncate text-sm font-medium',
                              isSelected ? 'text-orange-600' : 'text-gray-800'
                            )}
                          >
                            {option.label}
                          </span>
                          {option.description && (
                            <span className="block truncate text-xs text-gray-400">{option.description}</span>
                          )}
                        </span>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                              className="flex-shrink-0 text-orange-500"
                            >
                              <Check size={18} strokeWidth={3} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            )}
          </AnimatePresence>
        </div>
      )}
    </Listbox>
  );
}
