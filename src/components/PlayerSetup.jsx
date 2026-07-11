import { useState } from 'react'
import Button from './Button'
import { colorForIndex } from '../utils/playerColors'

const MIN_PLAYERS = 2

export default function PlayerSetup({ playerNames, setPlayerNames, onNext }) {
  const [draft, setDraft] = useState('')

  function addPlayer() {
    const name = draft.trim()
    if (!name) return
    setPlayerNames((prev) => [...prev, name])
    setDraft('')
  }

  function removePlayer(index) {
    setPlayerNames((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex min-h-dvh flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-white/70">
          Step 1 of 2
        </p>
        <h1 className="mt-1 text-4xl font-extrabold text-white drop-shadow-sm">
          Who&rsquo;s playing? 🎉
        </h1>
        <p className="mt-2 text-white/80">Add everyone at the table</p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          addPlayer()
        }}
        className="mt-6 flex gap-2"
      >
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a name..."
          maxLength={20}
          className="min-h-14 flex-1 rounded-full bg-white/90 px-5 text-lg font-semibold text-purple-950 placeholder-purple-400 shadow-inner outline-none ring-white/50 focus:ring-4"
        />
        <Button type="submit" variant="ghost" disabled={!draft.trim()} className="px-5">
          Add
        </Button>
      </form>

      <ul className="mt-6 flex-1 space-y-3 overflow-y-auto pb-4">
        {playerNames.map((name, i) => {
          const color = colorForIndex(i)
          return (
            <li
              key={`${name}-${i}`}
              className={`flex items-center justify-between rounded-2xl bg-gradient-to-r ${color.gradient} px-5 py-4 text-white shadow-md`}
            >
              <span className="text-lg font-bold">{name}</span>
              <button
                type="button"
                aria-label={`Remove ${name}`}
                onClick={() => removePlayer(i)}
                className="grid h-9 w-9 place-items-center rounded-full bg-black/15 text-xl font-bold active:bg-black/25"
              >
                ×
              </button>
            </li>
          )
        })}
        {playerNames.length === 0 && (
          <li className="mt-4 text-center text-white/70">
            No players yet — add at least {MIN_PLAYERS} to continue.
          </li>
        )}
      </ul>

      <div className="mt-2 flex flex-col items-center gap-2">
        <span className="text-sm font-semibold text-white/70">
          {playerNames.length} player{playerNames.length === 1 ? '' : 's'} added
        </span>
        <Button
          onClick={onNext}
          disabled={playerNames.length < MIN_PLAYERS}
          className="w-full"
        >
          Next: Add traits →
        </Button>
      </div>
    </div>
  )
}
