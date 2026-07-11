import { useState } from 'react'
import Button from './Button'

const MIN_TRAITS = 3

export default function TraitSetup({ traitList, setTraitList, onBack, onNext }) {
  const [draft, setDraft] = useState('')

  function addTrait() {
    const trait = draft.trim()
    if (!trait) return
    setTraitList((prev) => [...prev, trait])
    setDraft('')
  }

  function removeTrait(index) {
    setTraitList((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex min-h-dvh flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-white/70">
          Step 2 of 2
        </p>
        <h1 className="mt-1 text-4xl font-extrabold text-white drop-shadow-sm">
          Pick some traits 🃏
        </h1>
        <p className="mt-2 text-white/80">
          Things a partner could have — good, bad, or weird
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTrait()
        }}
        className="mt-6 flex gap-2"
      >
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="e.g. Loves karaoke"
          maxLength={60}
          className="min-h-14 flex-1 rounded-full bg-white/90 px-5 text-lg font-semibold text-purple-950 placeholder-purple-400 shadow-inner outline-none ring-white/50 focus:ring-4"
        />
        <Button type="submit" variant="ghost" disabled={!draft.trim()} className="px-5">
          Add
        </Button>
      </form>

      <ul className="mt-6 flex-1 space-y-3 overflow-y-auto pb-4">
        {traitList.map((trait, i) => (
          <li
            key={`${trait}-${i}`}
            className="flex items-center justify-between rounded-2xl bg-white/90 px-5 py-4 text-purple-950 shadow-md"
          >
            <span className="text-lg font-semibold">{trait}</span>
            <button
              type="button"
              aria-label={`Remove ${trait}`}
              onClick={() => removeTrait(i)}
              className="grid h-9 w-9 place-items-center rounded-full bg-purple-950/10 text-xl font-bold active:bg-purple-950/20"
            >
              ×
            </button>
          </li>
        ))}
        {traitList.length === 0 && (
          <li className="mt-4 text-center text-white/70">
            No traits yet — add at least {MIN_TRAITS} to start the game.
          </li>
        )}
      </ul>

      <div className="mt-2 flex flex-col items-center gap-3">
        <span className="text-sm font-semibold text-white/70">
          {traitList.length} trait{traitList.length === 1 ? '' : 's'} added
        </span>
        <div className="flex w-full gap-3">
          <Button variant="ghost" onClick={onBack} className="flex-1">
            ← Back
          </Button>
          <Button onClick={onNext} disabled={traitList.length < MIN_TRAITS} className="flex-[2]">
            Start game 🎬
          </Button>
        </div>
      </div>
    </div>
  )
}
