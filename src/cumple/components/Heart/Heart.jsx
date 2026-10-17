export const HEART_PATH =
  'M12 21.4 10.3 19.9C4.4 14.5.5 11 .5 6.6.5 3 3.3.2 6.9.2c2 0 4 .9 5.1 2.4C13.1 1.1 15.1.2 17.1.2c3.6 0 6.4 2.8 6.4 6.4 0 4.4-3.9 7.9-9.8 13.3L12 21.4Z';

export default function Heart({ className, outline = false }) {
  return (
    <svg className={className} viewBox="0 0 24 22" aria-hidden="true" focusable="false">
      <path
        d={HEART_PATH}
        fill={outline ? 'none' : 'currentColor'}
        stroke={outline ? 'currentColor' : 'none'}
        strokeWidth={outline ? 1.4 : 0}
      />
    </svg>
  );
}
