"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useAtom } from "jotai"
import { workoutsAtom } from "@/store/workouts"

export default function WorkoutList() {
  const [workouts] = useAtom(workoutsAtom)

  return (
    <AnimatePresence>
      {workouts.map((item) => (
        <motion.div
          key={`workout-${item.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Link
            href={`/workout/${item.id}`}
            className="group grid h-44 w-52 place-content-start gap-2 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className={`text-xl font-semibold`}>
              {item.title}
              {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span> */}
            </h2>
            <p className={`line-clamp-2 text-sm font-extralight opacity-50`}>
              {item.description}
            </p>

            <ul className="line-clamp-3 h-full overflow-hidden">
              {item.exercises.map((ex) => (
                <li
                  className={`text-sm opacity-50`}
                  key={`${item.id}-exercise-${ex.id}`}
                >
                  - {ex.name}{" "}
                  <span className="text-xs">
                    {ex.duration === 0
                      ? `${ex.sets}x${ex.repetitions}`
                      : `${ex.duration.toString()}s`}
                  </span>
                </li>
              ))}
            </ul>
          </Link>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
