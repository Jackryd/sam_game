import { useEffect, useState } from 'react'
import PlayerSetup from './components/PlayerSetup'
import TraitSetup from './components/TraitSetup'
import GameScreen from './components/GameScreen'
import ResultsScreen from './components/ResultsScreen'
import { shuffle } from './utils/shuffle'
import { randomName } from './utils/swedishNames'
import { deleteCookie, getCookie, setCookie } from './utils/cookies'

const PHASES = {
  PLAYERS: 'players',
  TRAITS: 'traits',
  GAME: 'game',
  RESULTS: 'results',
}

const COOKIE_NAME = 'dealbreakers_state'

function loadSavedState() {
  try {
    const raw = getCookie(COOKIE_NAME)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const needsPlayers = parsed.phase === PHASES.GAME || parsed.phase === PHASES.RESULTS
    if (needsPlayers && !parsed.players?.length) return null
    if (parsed.phase === PHASES.GAME && !parsed.traitQueue?.length) return null
    return parsed
  } catch {
    return null
  }
}

function App() {
  const [saved] = useState(loadSavedState)

  const [phase, setPhase] = useState(saved?.phase ?? PHASES.PLAYERS)
  const [playerNames, setPlayerNames] = useState(saved?.playerNames ?? [])
  const [traitList, setTraitList] = useState(saved?.traitList ?? [])

  // Game-only state, (re)initialized each time the game starts.
  const [players, setPlayers] = useState(saved?.players ?? [])
  const [traitQueue, setTraitQueue] = useState(saved?.traitQueue ?? [])
  const [turnIndex, setTurnIndex] = useState(saved?.turnIndex ?? 0)

  useEffect(() => {
    setCookie(
      COOKIE_NAME,
      JSON.stringify({ phase, playerNames, traitList, players, traitQueue, turnIndex }),
    )
  }, [phase, playerNames, traitList, players, traitQueue, turnIndex])

  function startGame() {
    setPlayers(playerNames.map((name) => ({ name, traits: [], date: null })))
    setTraitQueue(shuffle(traitList))
    setTurnIndex(0)
    setPhase(PHASES.GAME)
  }

  function selectDate(gender) {
    const playerIndex = turnIndex % players.length
    setPlayers((prev) =>
      prev.map((player, i) =>
        i === playerIndex
          ? { ...player, date: { gender, name: randomName(gender) } }
          : player,
      ),
    )
  }

  function decide(isDealbreaker) {
    const playerIndex = turnIndex % players.length
    const trait = traitQueue[turnIndex]

    setPlayers((prev) =>
      prev.map((player, i) =>
        i === playerIndex
          ? { ...player, traits: isDealbreaker ? [] : [...player.traits, trait] }
          : player,
      ),
    )

    const nextIndex = turnIndex + 1
    setTurnIndex(nextIndex)
    if (nextIndex >= traitQueue.length) {
      setPhase(PHASES.RESULTS)
    }
  }

  function playAgain() {
    deleteCookie(COOKIE_NAME)
    setPhase(PHASES.PLAYERS)
    setPlayerNames([])
    setTraitList([])
    setPlayers([])
    setTraitQueue([])
    setTurnIndex(0)
  }

  function rematchSameGroup() {
    setPhase(PHASES.TRAITS)
    setTraitList([])
  }

  function handleNewGameClick() {
    if (window.confirm('Start a new game? This clears the current players and traits.')) {
      playAgain()
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      {phase !== PHASES.RESULTS && (
        <button
          type="button"
          onClick={handleNewGameClick}
          aria-label="Start new game"
          className="fixed right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-20 grid h-10 w-10 place-items-center rounded-full bg-black/20 text-lg text-white backdrop-blur-sm transition-transform active:scale-90 active:bg-black/30"
        >
          ↺
        </button>
      )}
      {phase === PHASES.PLAYERS && (
        <PlayerSetup
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
          onNext={() => setPhase(PHASES.TRAITS)}
        />
      )}
      {phase === PHASES.TRAITS && (
        <TraitSetup
          traitList={traitList}
          setTraitList={setTraitList}
          onBack={() => setPhase(PHASES.PLAYERS)}
          onNext={startGame}
        />
      )}
      {phase === PHASES.GAME && (
        <GameScreen
          players={players}
          traitQueue={traitQueue}
          turnIndex={turnIndex}
          onDecide={decide}
          onSelectDate={selectDate}
        />
      )}
      {phase === PHASES.RESULTS && (
        <ResultsScreen
          players={players}
          onPlayAgain={playAgain}
          onRematchSameGroup={rematchSameGroup}
        />
      )}
    </div>
  )
}

export default App
