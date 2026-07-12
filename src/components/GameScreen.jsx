import TraitCard from './TraitCard'
import { colorForIndex } from '../utils/playerColors'

function DatePicker({ playerName, onSelectDate }) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-6 py-2">
      <p className="text-center text-3xl font-extrabold text-white drop-shadow-sm">
        First date time, {playerName}! 💘
      </p>
      <p className="text-center font-semibold text-white/80">
        Who are you going out with?
      </p>
      <div className="flex w-full max-w-xs flex-col gap-4">
        <button
          type="button"
          onClick={() => onSelectDate('man')}
          className="min-h-20 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 text-2xl font-extrabold text-white shadow-lg shadow-blue-900/30 transition-transform active:scale-95"
        >
          👨 A man
        </button>
        <button
          type="button"
          onClick={() => onSelectDate('kvinna')}
          className="min-h-20 rounded-3xl bg-gradient-to-br from-pink-400 to-rose-600 text-2xl font-extrabold text-white shadow-lg shadow-rose-900/30 transition-transform active:scale-95"
        >
          👩 A woman
        </button>
      </div>
      <p className="text-center text-sm font-semibold text-white/60">
        We&rsquo;ll set you up with someone random...
      </p>
    </div>
  )
}

export default function GameScreen({ players, traitQueue, turnIndex, onDecide, onSelectDate }) {
  const playerIndex = turnIndex % players.length
  const currentPlayer = players[playerIndex]
  const currentTrait = traitQueue[turnIndex]
  const color = colorForIndex(playerIndex)
  const progress = (turnIndex / traitQueue.length) * 100

  return (
    <div className="flex h-dvh flex-col overflow-hidden px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
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
        {currentPlayer.date && (
          <p className="mt-1 text-sm font-bold opacity-90">
            On a date with {currentPlayer.date.name}{' '}
            {currentPlayer.date.gender === 'man' ? '👨' : '👩'}
          </p>
        )}
      </div>

      {currentPlayer.date ? (
        <>
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
        </>
      ) : (
        <DatePicker playerName={currentPlayer.name} onSelectDate={onSelectDate} />
      )}
    </div>
  )
}
