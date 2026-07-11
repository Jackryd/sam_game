import TraitCard from './TraitCard'
import { colorForIndex } from '../utils/playerColors'

export default function GameScreen({ players, traitQueue, turnIndex, onDecide }) {
  const playerIndex = turnIndex % players.length
  const currentPlayer = players[playerIndex]
  const currentTrait = traitQueue[turnIndex]
  const color = colorForIndex(playerIndex)
  const progress = (turnIndex / traitQueue.length) * 100

  return (
    <div className="flex min-h-dvh flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-center text-sm font-semibold text-white/70">
        Trait {turnIndex + 1} of {traitQueue.length}
      </p>

      <div
        className={`mt-4 rounded-2xl bg-gradient-to-r ${color.gradient} px-5 py-4 text-center text-white shadow-md`}
      >
        <p className="text-sm font-bold uppercase tracking-widest opacity-80">
          It&rsquo;s your turn
        </p>
        <h1 className="text-3xl font-extrabold">{currentPlayer.name}</h1>
      </div>

      <div className="mt-4 min-h-16">
        {currentPlayer.traits.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {currentPlayer.traits.map((trait, i) => (
              <span
                key={i}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"
              >
                {trait}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm font-semibold text-white/60">
            Starting fresh 🌱 — nothing held yet
          </p>
        )}
      </div>

      <TraitCard key={turnIndex} trait={currentTrait} onDecide={onDecide} />
    </div>
  )
}
