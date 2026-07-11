// Playful gradient + solid-accent pairs assigned to players in rotation.
export const PLAYER_COLORS = [
  { gradient: 'from-pink-400 to-rose-500', solid: 'bg-rose-500', text: 'text-rose-500', ring: 'ring-rose-400' },
  { gradient: 'from-sky-400 to-blue-500', solid: 'bg-blue-500', text: 'text-blue-500', ring: 'ring-sky-400' },
  { gradient: 'from-amber-300 to-orange-500', solid: 'bg-orange-500', text: 'text-orange-500', ring: 'ring-amber-400' },
  { gradient: 'from-emerald-400 to-teal-500', solid: 'bg-teal-500', text: 'text-teal-500', ring: 'ring-emerald-400' },
  { gradient: 'from-violet-400 to-purple-500', solid: 'bg-purple-500', text: 'text-purple-500', ring: 'ring-violet-400' },
  { gradient: 'from-fuchsia-400 to-pink-500', solid: 'bg-fuchsia-500', text: 'text-fuchsia-500', ring: 'ring-fuchsia-400' },
  { gradient: 'from-lime-400 to-green-500', solid: 'bg-green-500', text: 'text-green-500', ring: 'ring-lime-400' },
  { gradient: 'from-cyan-400 to-indigo-500', solid: 'bg-indigo-500', text: 'text-indigo-500', ring: 'ring-cyan-400' },
]

export function colorForIndex(index) {
  return PLAYER_COLORS[index % PLAYER_COLORS.length]
}
