import Button from './Button'
import { colorForIndex } from '../utils/playerColors'

export default function ResultsScreen({ players, onPlayAgain, onRematchSameGroup }) {
  const maxTraits = Math.max(...players.map((p) => p.traits.length))
  const hasWinner = maxTraits > 0

  return (
    <div className="flex min-h-dvh flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-sm">
          Game over! 🎊
        </h1>
        <p className="mt-2 text-white/80">Here&rsquo;s what everyone ended up with</p>
      </header>

      <ul className="mt-6 flex-1 space-y-4 overflow-y-auto pb-4">
        {players.map((player, i) => {
          const color = colorForIndex(i)
          const isWinner = hasWinner && player.traits.length === maxTraits
          return (
            <li
              key={player.name}
              className={`rounded-2xl bg-gradient-to-r ${color.gradient} p-5 text-white shadow-md`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold">
                  {isWinner && '👑 '}
                  {player.name}
                </h2>
                <span className="text-sm font-bold opacity-80">
                  {player.traits.length} kept
                </span>
              </div>
              {player.traits.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {player.traits.map((trait, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-white/25 px-3 py-1 text-sm font-semibold"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm font-semibold opacity-80">
                  Clean slate 😅 every trait was a dealbreaker
                </p>
              )}
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col gap-3">
        <Button variant="ghost" onClick={onRematchSameGroup}>
          🔁 Same players, new traits
        </Button>
        <Button variant="primary" onClick={onPlayAgain}>
          🆕 New game
        </Button>
      </div>
    </div>
  )
}
