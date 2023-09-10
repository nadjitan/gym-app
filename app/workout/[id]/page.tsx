"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { initialData } from "@/components/workouts/workout-list"
import { Play, Square, Pause, ListRestart, StepForward } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Dumbbell, MoveLeft, ArrowRight } from "lucide-react"
import { animate, stagger, motion, Reorder } from "framer-motion"
import useTimer from "@/hooks/useTimer"
import { ListButton } from "@/components/ui/list-button"

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
  const pathEl = useRef<SVGPathElement>(null)

  return (
    <svg viewBox="0 0 110 100" className="h-full" fill="currentColor">
      <linearGradient x1="0" y1="0" x2="0" y2="100%">
        <stop offset="0%" />
        <stop offset="100%" />
      </linearGradient>
      <path
        strokeLinecap="round"
        strokeWidth={6}
        className="stroke-gray-200 opacity-50 dark:opacity-20"
        d="M30,90 A40,40 0 1,1 80,90"
        fill="none"
      />
      <path
        ref={pathEl}
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
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-foreground"
        >
          😴
        </text>
      ) : (
        <Dumbbell
          // https://stackoverflow.com/a/46828111
          x={110 / 2 - 22 / 2}
          y={100 / 2 - 22 / 2 + 5}
          strokeWidth={2.7}
          size={22}
          // TODO: Rotate not working
          className="rotate-45"
        />
      )}

      <text
        x="50%"
        y="90%"
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

export default function Workout({ params }: { params: { id: string } }) {
  const router = useRouter()

  const workout = initialData.find((item) => item.id === params.id)
  const [exercises] = useState(workout?.items!)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [exercise, setExercise] = useState(exercises[exerciseIndex])

  const itemElsRef = useRef<HTMLDivElement[]>([])

  const { isActive, progress, setTime, startTimer, pauseTimer, resetTimer } =
    useTimer(exercise.duration)

  function resetAll() {
    resetTimer()
    setExerciseIndex(0)
    setExercise(exercises[0]!)
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
      <section className="flex h-full flex-1 flex-col items-center rounded-lg border p-4">
        <section className="flex h-max w-full justify-between">
          <Button
            className="flex gap-2 text-lg"
            variant={"ghost"}
            disabled={isActive}
            onClick={() => router.replace("/")}
          >
            <MoveLeft /> Exit
          </Button>

          <Button
            className="flex gap-2 text-lg"
            variant={"ghost"}
            onClick={() => resetAll()}
          >
            <ListRestart /> Reset
          </Button>
        </section>

        <h1 className="mt-12 text-4xl font-black underline lg:text-7xl">
          {workout?.title}
        </h1>

        {exercise.duration > 0 && (
          <div className="mt-2 h-56 lg:mt-10 lg:h-80">
            <SemicircleProgressBar
              duration={exercise.duration}
              isRest={exercise.type === "rest"}
              progress={progress}
            />
          </div>
        )}

        {exercise.duration === 0 && (
          <h2 className="mt-16 text-xl font-semibold">
            {exercise.sets}x{exercise.repetitions}
          </h2>
        )}

        <h1 className="text-3xl font-semibold">{exercise.name}</h1>
      </section>

      <section className="relative flex h-full flex-1 flex-col gap-2 overflow-hidden">
        <section className="flex h-max gap-2">
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
        </section>

        <div className="relative flex h-full w-full flex-col place-content-start gap-2 overflow-y-auto overflow-x-hidden">
          {exercises.map((ex, i) => {
            const currItemRef = useRef<HTMLDivElement>(null)

            useEffect(() => {
              if (currItemRef.current)
                itemElsRef.current?.push(currItemRef.current!)
            }, [currItemRef])
            return (
              <div
                ref={currItemRef}
                className={`exercise-item flex items-center gap-2`}
                key={`${workout!.id}${ex.name}${i}`}
              >
                {exercise.id === ex.id && (
                  <motion.div layoutId="active-exercise" className="z-20">
                    <ArrowRight strokeWidth={2.5} />
                  </motion.div>
                )}
                <motion.div layout className="z-10 w-full">
                  <ListButton
                    className="h-14 w-full"
                    variant={"outline"}
                    onClick={() => {
                      setExerciseIndex(i)
                      setExercise(ex)
                      resetTimer()
                    }}
                  >
                    <p className="mr-2 w-10 text-end text-sm font-bold transition-all">
                      {ex.duration === 0
                        ? `${ex.sets}x${ex.repetitions}`
                        : `${ex.duration.toString()}s`}
                    </p>
                    <h4 className="text-lg">{ex.name}</h4>
                  </ListButton>
                </motion.div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
