import { useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import Button from './Button'
import wildcardImg from '../assets/wildcard.jpeg'

const SWIPE_THRESHOLD = 110
const WILDCARD_CHANCE = 0.01

export default function TraitCard({ trait, onDecide }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-18, 18])
  const keepOpacity = useTransform(x, [20, 120], [0, 1])
  const dealOpacity = useTransform(x, [-120, -20], [1, 0])
  const controls = useAnimation()
  const [locked, setLocked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [flipDone, setFlipDone] = useState(false)
  // Rolled once per card (the component remounts every turn).
  const [isWildcard] = useState(() => Math.random() < WILDCARD_CHANCE)
  // Normally one half-turn flip; sometimes the card goes for a joyride.
  const [megaSpin] = useState(() => Math.random() < 0.1)

  useEffect(() => {
    controls.set({ x: 0, rotate: 0, scale: 0.9, opacity: 0, y: 24 })
    controls.start({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 320, damping: 24 },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trait])

  function resolve(isDealbreaker) {
    if (locked || !flipDone) return
    setLocked(true)
    controls
      .start({
        x: isDealbreaker ? -650 : 650,
        rotate: isDealbreaker ? -28 : 28,
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeIn' },
      })
      .then(() => onDecide(isDealbreaker))
  }

  function handleDragEnd(_, info) {
    if (locked || !flipDone) return
    if (info.offset.x > SWIPE_THRESHOLD) resolve(false)
    else if (info.offset.x < -SWIPE_THRESHOLD) resolve(true)
    else {
      controls.start({
        x: 0,
        rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 22 },
      })
    }
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-5 py-2">
      <div className="flex min-h-0 w-full flex-1 items-center justify-center [perspective:1200px]">
        <motion.div
          style={{ x, rotate }}
          drag={locked || !flipDone ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.9}
          onDragEnd={handleDragEnd}
          onTap={() => !revealed && setRevealed(true)}
          animate={controls}
          whileTap={{ scale: 1.03 }}
          className={`relative aspect-[3/4] max-h-full w-full max-w-xs touch-none select-none [@media(min-height:820px)]:max-w-sm ${
            flipDone ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
          }`}
        >
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            initial={false}
            animate={{ rotateY: revealed ? (megaSpin ? 180 - 1260 : 0) : 180 }}
            transition={
              revealed
                ? megaSpin
                  ? { duration: 1.2, ease: [0.2, 0.6, 0.35, 1] }
                  : { duration: 0.6, ease: [0.3, 0.6, 0.3, 1] }
                : { duration: 0 }
            }
            onAnimationComplete={() => revealed && setFlipDone(true)}
          >
            {/* Front face */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl bg-white p-6 text-center shadow-xl [backface-visibility:hidden]">
              {isWildcard ? (
                <img
                  src={wildcardImg}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <p className="text-2xl font-extrabold leading-snug text-purple-950 [@media(min-height:820px)]:text-3xl">
                  {trait}
                </p>
              )}
              <motion.span
                style={{ opacity: dealOpacity }}
                className="absolute left-4 top-4 rotate-[-12deg] rounded-lg border-4 border-rose-500 bg-white/80 px-3 py-1 text-xl font-black text-rose-500"
              >
                NOPE
              </motion.span>
              <motion.span
                style={{ opacity: keepOpacity }}
                className="absolute right-4 top-4 rotate-[12deg] rounded-lg border-4 border-emerald-500 bg-white/80 px-3 py-1 text-xl font-black text-emerald-500"
              >
                KEEP
              </motion.span>
            </div>

            {/* Back face */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <span className="text-7xl drop-shadow-lg">🎴</span>
              <span className="text-xl font-extrabold uppercase tracking-widest text-white/90">
                Tap to reveal
              </span>
              <span className="absolute left-5 top-5 text-2xl opacity-60">✨</span>
              <span className="absolute bottom-5 right-5 text-2xl opacity-60">✨</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <p className="relative z-10 text-sm font-semibold text-white/70">
        {flipDone
          ? 'Swipe the card or tap a button below'
          : revealed
            ? 'Here it comes...'
            : 'Tap the card to flip it over'}
      </p>

      <div className="relative z-10 flex w-full max-w-xs gap-4 [@media(min-height:820px)]:max-w-sm">
        <Button
          variant="dealbreaker"
          onClick={() => resolve(true)}
          disabled={locked || !flipDone}
          className="flex-1"
        >
          💔 Dealbreaker
        </Button>
        <Button
          variant="keep"
          onClick={() => resolve(false)}
          disabled={locked || !flipDone}
          className="flex-1"
        >
          💚 Keep it
        </Button>
      </div>
    </div>
  )
}
