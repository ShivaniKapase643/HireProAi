/**
 * Cleans up raw user names that may carry an ID-style prefix.
 * Example: "76_CM4i_yashvant Mane" -> "Yashvant Mane"
 * Strategy: for each space-separated token, if it contains underscores
 * (an injected id prefix like "76_CM4i_"), keep only the segment after
 * the last underscore. Then title-case each word.
 */
export function getCleanName(raw = '') {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .trim()
    .split(/\s+/)
    .map((token) => (token.includes('_') ? token.split('_').pop() : token))
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** First name only, with a friendly fallback. */
export function getFirstName(raw = '', fallback = 'Friend') {
  const clean = getCleanName(raw);
  return clean.split(' ')[0] || fallback;
}

/** Single-character initial for avatars. */
export function getInitial(raw = '') {
  const first = getFirstName(raw, '');
  return (first[0] || 'U').toUpperCase();
}
