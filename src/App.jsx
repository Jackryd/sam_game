import { useState } from 'react'
import PlayerSetup from './components/PlayerSetup'
import TraitSetup from './components/TraitSetup'
import GameScreen from './components/GameScreen'
import ResultsScreen from './components/ResultsScreen'
import { shuffle } from './utils/shuffle'

const PHASES = {
  PLAYERS: 'players',
  TRAITS: 'traits',
  GAME: 'game',
  RESULTS: 'results',
}

function App() {
  const [phase, setPhase] = useState(PHASES.PLAYERS)
  const [playerNames, setPlayerNames] = useState([])
  const [traitList, setTraitList] = useState([])

  // Game-only state, (re)initialized each time the game starts.
  const [players, setPlayers] = useState([])
  const [traitQueue, setTraitQueue] = useState([])
  const [turnIndex, setTurnIndex] = useState(0)

  function startGame() {
    setPlayers(playerNames.map((name) => ({ name, traits: [] })))
    setTraitQueue(shuffle(traitList))
    setTurnIndex(0)
    setPhase(PHASES.GAME)
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

  return (
    <div className="flex min-h-dvh flex-col">
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
