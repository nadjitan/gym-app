"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { workoutsAtom } from "@/store/workouts"
import {
  Play,
  Square,
  Pause,
  ListRestart,
  StepForward,
  FileEdit,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Dumbbell, MoveLeft, ArrowRight } from "lucide-react"
import {
  animate,
  stagger,
  motion,
  Transition,
  AnimatePresence,
} from "framer-motion"
import useTimer from "@/hooks/useTimer"
import { ListButton } from "@/components/ui/list-button"
import { useAtom } from "jotai"

interface SemicircleProgressBarProps {
  duration: number
  isRest: boolean
  progress: number
}

const SemicircleProgressBar: React.FC<SemicircleProgressBarProps> = ({
  duration,
  isRest,
  progress,
}) => {
  return (
    <svg viewBox="11 15 88 88" className="h-full w-full" fill="currentColor">
      <path
        strokeLinecap="round"
        strokeWidth={6}
        className="stroke-gray-200 opacity-50 dark:opacity-20"
        d="M30,90 A40,40 0 1,1 80,90"
        fill="none"
      />
      <path
        strokeLinecap="round"
        strokeDasharray={198}
        strokeDashoffset={Math.round(198 * (progress / duration))}
        strokeWidth={6}
        fill="none"
        className="stroke-green-600 transition-[stroke-dashoffset_.2s_cubic-bezier(.7,0,.3,1)]"
        d="M30,90 A40,40 0 1,1 80,90"
      />

      {isRest ? (
        <text
          x={11 + 88 / 2 - 22 / 2}
          y={15 + 88 / 2 - 22 / 2 + 15}
          className="text-foreground"
        >
          😴
        </text>
      ) : (
        <Dumbbell
          // https://stackoverflow.com/a/46828111
          x={11 + 88 / 2 - 22 / 2}
          y={15 + 88 / 2 - 22 / 2}
          strokeWidth={2.7}
          size={22}
          // TODO: Rotate not working
          className="rotate-45"
        />
      )}

      <text
        x="62%"
        y="110%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-foreground"
      >
        {progress !== -1 ? progress : 0}
      </text>
    </svg>
  )
}

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 })
const springTransition: Transition = {
  type: "spring",
  stiffness: 700,
  damping: 30,
}

export default function Workout({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [workouts] = useAtom(workoutsAtom)
  const workout = workouts.find((item) => item.id === params.id)
  const [exercises] = useState(workout?.exercises!)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [exercise, setExercise] = useState(exercises[exerciseIndex])

  const itemElsRef = useRef<HTMLDivElement[]>([])

  const { isActive, progress, setTime, startTimer, pauseTimer, resetTimer } =
    useTimer(exercise.duration)

  function resetAll() {
    resetTimer()
    setExerciseIndex(0)
    setExercise(exercises[0]!)
    setTime(exercises[0].duration)
    itemElsRef.current![0].scrollIntoView({
      behavior: "smooth",
    })
  }
  function goNext() {
    const nextIndex = exerciseIndex + 1
    const nextExercise = exercises[nextIndex]!
    itemElsRef.current![nextIndex].scrollIntoView({
      behavior: "smooth",
    })
    setTime(nextExercise.duration!)
    setExerciseIndex(nextIndex)
    setExercise(nextExercise)
    if (nextExercise.duration > 0) startTimer()
  }

  useEffect(() => {
    animate(
      ".exercise-item",
      { opacity: [0, 1], scale: [0, 1] },
      {
        duration: 0.2,
        delay: staggerMenuItems,
        type: "spring",
      },
    )
  }, [])

  useEffect(() => {
    if (exercise.duration === 0) pauseTimer()
  }, [exercise])

  useEffect(() => {
    if (progress === -1 && exerciseIndex === exercises.length! - 1) resetAll()

    if (progress === -1 && exerciseIndex < exercises.length! - 1) goNext()
  }, [progress])

  return (
    <div className="flex h-full w-full flex-col gap-2 animate-in fade-in lg:max-w-6xl lg:flex-row">
      <title>{`${workout?.title} - ${exercise.name}`}</title>
      <section className="relative flex h-full flex-1 flex-col items-center gap-4 overflow-hidden rounded-lg border p-4">
        <div className="flex h-max w-full justify-between">
          <Button
            className="flex gap-2 md:text-lg"
            variant={"ghost"}
            disabled={isActive}
            onClick={() => router.replace("/")}
          >
            <MoveLeft /> Exit
          </Button>

          <Button
            className="flex gap-2 md:text-lg"
            variant={"ghost"}
            disabled={exerciseIndex === 0}
            onClick={() => resetAll()}
          >
            <ListRestart /> Reset
          </Button>
        </div>

        <h1 className="text-center text-xl font-black opacity-20 lg:text-6xl">
          {workout?.title}
        </h1>

        <AnimatePresence>
          {exercise.duration > 0 ? (
            <>
              <motion.div
                className="h-max w-36 md:w-56 lg:w-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SemicircleProgressBar
                  duration={exercise.duration}
                  isRest={exercise.type === "rest"}
                  progress={progress}
                />
              </motion.div>
              <motion.h1 className="line-clamp-2 text-3xl font-semibold">
                {exercise.name}
              </motion.h1>
            </>
          ) : (
            <>
              <motion.h2
                className="pt-14 text-2xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {exercise.sets}x{exercise.repetitions}
              </motion.h2>
              <motion.h1 className="line-clamp-2 text-3xl font-semibold">
                {exercise.name}
              </motion.h1>
            </>
          )}
        </AnimatePresence>

        <Button
          variant="ghost"
          className="absolute bottom-4 left-4 flex gap-2 md:text-lg"
          onClick={() => {
            router.push(`/edit-workout/${workout!.id}`)
          }}
        >
          <FileEdit /> Edit
        </Button>
      </section>

      <section className="relative flex h-full flex-1 flex-col gap-2 overflow-hidden">
        <div className="flex h-max gap-2">
          <Button
            className="flex h-[78px] w-full gap-2 px-0 py-8 text-lg"
            {...(!isActive && progress === exercise.duration
              ? { disabled: true }
              : {})}
            onClick={() => resetTimer()}
            variant={
              !isActive && progress === exercise.duration
                ? "outline"
                : "destructive"
            }
          >
            <Square fill="currentColor" />
            Stop
          </Button>

          {exercise.duration > 0 ? (
            <Button
              className="flex h-[78px] w-full gap-2 px-0 py-8 text-lg"
              onClick={() => {
                if (isActive) pauseTimer()
                else startTimer()
              }}
            >
              {isActive ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" />
              )}
              {!isActive && exerciseIndex === 0
                ? "Start"
                : !isActive && exerciseIndex > 0
                ? "Continue"
                : isActive
                ? "Pause"
                : null}
            </Button>
          ) : (
            <Button
              className="flex h-[78px] w-full gap-2 px-0 py-8 text-lg"
              onClick={() => {
                if (exerciseIndex === exercises.length! - 1) resetAll()
                else goNext()
              }}
            >
              Next <StepForward className="fill-background" />
            </Button>
          )}
        </div>

        <div className="relative flex h-full w-full flex-col place-content-start gap-2 overflow-y-auto overflow-x-hidden">
          {exercises.map((ex, i) => (
            <div
              key={`exercise-${ex.id}`}
              ref={(el) => {
                itemElsRef.current.push(el!)
              }}
              className={`exercise-item flex items-center gap-2`}
            >
              {exercise.id === ex.id && (
                <motion.div
                  className="z-20"
                  layoutId="active-exercise"
                  transition={springTransition}
                >
                  <ArrowRight strokeWidth={2.5} />
                </motion.div>
              )}
              <motion.div className="z-10 w-full" layout>
                <ListButton
                  className="h-14 w-full"
                  variant={"outline"}
                  onClick={() => {
                    resetTimer()
                    setExerciseIndex(i)
                    setExercise(ex)
                    setTime(ex.duration)
                  }}
                >
                  {/* Children also needs `motion` to scale correctly during parent `layout` animations  */}
                  <motion.p
                    layout
                    className="mr-2 w-10 text-end text-sm font-light"
                  >
                    {ex.duration === 0
                      ? `${ex.sets}x${ex.repetitions}`
                      : `${ex.duration.toString()}s`}
                  </motion.p>
                  <motion.h4 layout className="line-clamp-1 text-lg">
                    {ex.name}
                  </motion.h4>
                </ListButton>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
