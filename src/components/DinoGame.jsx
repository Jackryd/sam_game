import { useEffect, useRef, useState } from 'react'

const GROUND_OFFSET = 30
const DINO_X = 30
const DINO_SIZE = 40
const CACTUS_SIZE = 34
const JUMP_VELOCITY = -13
const GRAVITY = 0.7

export default function DinoGame({ onClose }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const cssW = canvas.clientWidth
    const cssH = canvas.clientHeight
    canvas.width = cssW * dpr
    canvas.height = cssH * dpr
    ctx.scale(dpr, dpr)
    const groundY = cssH - GROUND_OFFSET

    const g = {
      y: groundY,
      vy: 0,
      obstacles: [],
      clouds: [{ x: cssW * 0.7, y: 40 }],
      speed: 5,
      frames: 0,
      nextSpawn: 100,
      over: false,
      raf: 0,
    }
    gameRef.current = g

    function reset() {
      g.y = groundY
      g.vy = 0
      g.obstacles = []
      g.speed = 5
      g.frames = 0
      g.nextSpawn = 100
      g.over = false
      setScore(0)
      setGameOver(false)
      loop()
    }
    g.reset = reset

    function loop() {
      g.frames++
      g.speed += 0.002

      // Dino physics
      g.vy += GRAVITY
      g.y = Math.min(g.y + g.vy, groundY)
      if (g.y === groundY) g.vy = 0

      // Spawn + move obstacles
      if (g.frames >= g.nextSpawn) {
        g.obstacles.push({ x: cssW + 20 })
        g.nextSpawn = g.frames + Math.max(45, 55 + Math.random() * 60 - g.speed * 2)
      }
      for (const o of g.obstacles) o.x -= g.speed
      g.obstacles = g.obstacles.filter((o) => o.x > -50)

      for (const c of g.clouds) c.x -= g.speed * 0.25
      g.clouds = g.clouds.filter((c) => c.x > -60)
      if (g.clouds.length < 2 && Math.random() < 0.01) {
        g.clouds.push({ x: cssW + 40, y: 25 + Math.random() * 50 })
      }

      // Collision (generously shrunk boxes)
      const dTop = g.y - DINO_SIZE + 12
      const dLeft = DINO_X + 8
      const dRight = DINO_X + DINO_SIZE - 10
      for (const o of g.obstacles) {
        const oLeft = o.x + 8
        const oRight = o.x + CACTUS_SIZE - 8
        const oTop = groundY - CACTUS_SIZE + 8
        if (dRight > oLeft && dLeft < oRight && g.y > oTop && dTop < groundY) {
          g.over = true
        }
      }

      // Draw
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, cssW, cssH)

      ctx.font = '28px serif'
      for (const c of g.clouds) ctx.fillText('☁️', c.x, c.y)

      ctx.strokeStyle = '#c4b5fd'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, groundY + 2)
      ctx.lineTo(cssW, groundY + 2)
      ctx.stroke()

      ctx.font = `${CACTUS_SIZE}px serif`
      for (const o of g.obstacles) ctx.fillText('🌵', o.x, groundY)

      // Mirror the dino so it faces the oncoming cacti
      ctx.save()
      ctx.translate(DINO_X + DINO_SIZE / 2, 0)
      ctx.scale(-1, 1)
      ctx.font = `${DINO_SIZE}px serif`
      ctx.fillText('🦖', -DINO_SIZE / 2, g.y)
      ctx.restore()

      const s = Math.floor(g.frames / 6)
      setScore(s)

      if (g.over) {
        setGameOver(true)
        setHighScore((h) => Math.max(h, s))
        return
      }
      g.raf = requestAnimationFrame(loop)
    }

    function jump() {
      if (g.over) return
      if (g.y >= groundY) g.vy = JUMP_VELOCITY
    }
    g.jump = jump

    function onKey(e) {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        if (g.over) g.reset()
        else jump()
      }
    }
    window.addEventListener('keydown', onKey)
    loop()

    return () => {
      cancelAnimationFrame(g.raf)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  function handleTap() {
    const g = gameRef.current
    if (!g) return
    if (g.over) g.reset()
    else g.jump()
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-purple-700/95 to-indigo-900/95 px-5 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close dino game"
        className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] grid h-10 w-10 place-items-center rounded-full bg-white/15 text-xl font-bold text-white active:bg-white/25"
      >
        ×
      </button>

      <h1 className="text-3xl font-extrabold text-white drop-shadow-sm">
        Dino break! 🦖
      </h1>
      <p className="text-sm font-semibold text-white/70">
        Score: {score} · Best: {highScore}
      </p>

      <div className="relative w-full max-w-md touch-none" onPointerDown={handleTap}>
        <canvas
          ref={canvasRef}
          className="h-64 w-full select-none rounded-2xl shadow-2xl"
        />
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-black/40">
            <p className="text-2xl font-extrabold text-white">Game over! 💀</p>
            <p className="text-sm font-semibold text-white/80">
              Tap the screen to try again
            </p>
          </div>
        )}
      </div>

      <p className="text-sm font-semibold text-white/70">
        Tap to jump over the cacti
      </p>
    </div>
  )
}
