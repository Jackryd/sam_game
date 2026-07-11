import { useEffect, useState } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import Button from './Button'

const SWIPE_THRESHOLD = 110

export default function TraitCard({ trait, onDecide }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-250, 250], [-18, 18])
  const keepOpacity = useTransform(x, [20, 120], [0, 1])
  const dealOpacity = useTransform(x, [-120, -20], [1, 0])
  const controls = useAnimation()
  const [locked, setLocked] = useState(false)

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
    if (locked) return
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
    if (locked) return
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
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-4">
      <motion.div
        style={{ x, rotate }}
        drag={locked ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ scale: 1.03 }}
        className="relative flex aspect-[3/4] w-full max-w-xs cursor-grab touch-none select-none items-center justify-center rounded-3xl bg-white p-6 text-center shadow-2xl active:cursor-grabbing"
      >
        <motion.span
          style={{ opacity: dealOpacity }}
          className="absolute left-4 top-4 rotate-[-12deg] rounded-lg border-4 border-rose-500 px-3 py-1 text-xl font-black text-rose-500"
        >
          NOPE
        </motion.span>
        <motion.span
          style={{ opacity: keepOpacity }}
          className="absolute right-4 top-4 rotate-[12deg] rounded-lg border-4 border-emerald-500 px-3 py-1 text-xl font-black text-emerald-500"
        >
          KEEP
        </motion.span>
        <p className="text-2xl font-extrabold leading-snug text-purple-950">
          {trait}
        </p>
      </motion.div>

      <p className="text-sm font-semibold text-white/70">
        Swipe the card or tap a button below
      </p>

      <div className="flex w-full max-w-xs gap-4">
        <Button
          variant="dealbreaker"
          onClick={() => resolve(true)}
          disabled={locked}
          className="flex-1"
        >
          💔 Dealbreaker
        </Button>
        <Button
          variant="keep"
          onClick={() => resolve(false)}
          disabled={locked}
          className="flex-1"
        >
          💚 Keep it
        </Button>
      </div>
    </div>
  )
}
