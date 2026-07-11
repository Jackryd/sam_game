const VARIANTS = {
  primary:
    'bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-lg shadow-purple-900/30 active:from-fuchsia-600 active:to-purple-700',
  ghost: 'bg-white/15 text-white backdrop-blur-sm active:bg-white/25',
  keep: 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-900/30 active:from-emerald-500 active:to-teal-600',
  dealbreaker:
    'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-lg shadow-red-900/30 active:from-rose-600 active:to-red-700',
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`min-h-14 rounded-full px-6 text-lg font-bold tracking-wide transition-transform duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
