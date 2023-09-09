"use client"

import { Button } from "@/components/ui/button"
import { initialData } from "@/components/workouts/workout-list"
import { Play, Square, Pause } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { atom, useAtom } from "jotai"

const workoutPropsAtom = atom({ isPaused: true, isStopPressed: false })

interface SemicircleProgressBarProps {
  /** Total duration in seconds */
  duration: number
  isPaused: boolean
}

/** @see https://stackoverflow.com/a/50650034 */
const SemicircleProgressBar: React.FC<SemicircleProgressBarProps> = ({
  duration,
}) => {
  const [progress, setProgress] = useState<number>(duration)
  const [workoutProps, setWorkoutProps] = useAtom(workoutPropsAtom)
  const pathEl = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (workoutProps.isStopPressed) {
      setProgress(duration)
      setWorkoutProps({ ...workoutProps, isStopPressed: false })
    }
  }, [workoutProps.isStopPressed])

  useEffect(() => {
    if (progress === 0) setWorkoutProps({ ...workoutProps, isPaused: true })
  }, [progress])

  useEffect(() => {
    const interval = setInterval(() => {
      if (workoutProps.isPaused) return

      setProgress(prevProgress => {
        if (prevProgress > 0) return prevProgress - 1
        else {
          clearInterval(interval)
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [duration, workoutProps.isPaused])

  return (
    <svg viewBox="0 0 110 100" className="h-full">
      <linearGradient x1="0" y1="0" x2="0" y2="100%">
        <stop offset="0%" />
        <stop offset="100%" />
      </linearGradient>
      <path
        strokeLinecap="round"
        strokeWidth={6}
        className="grey stroke-gray-100"
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
        className="stroke-blue-600 transition-[stroke-dashoffset_.2s_cubic-bezier(.7,0,.3,1)]"
        d="M30,90 A40,40 0 1,1 80,90"
      />

      <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle">
        {progress}
      </text>
    </svg>
  )
}

export default function Workout({ params }: { params: { id: string } }) {
  const [workoutProps, setWorkoutProps] = useAtom(workoutPropsAtom)
  const workout = initialData.find(item => item.id === params.id)
  const [exercise, setExercise] = useState(workout?.items[0]!)

  return (
    <main className="flex flex-col h-screen items-center py-14 px-4">
      <div className="lg:max-w-6xl w-full h-full flex gap-2">
        <section className="border h-full flex flex-col items-center flex-1 rounded-lg p-4">
          <h1 className="text-7xl font-black">{workout?.title}</h1>
          <div className="h-80">
            <SemicircleProgressBar
              duration={5}
              isPaused={workoutProps.isPaused}
            />
          </div>
        </section>

        <section className="h-full flex flex-col gap-2 flex-1">
          <section className="flex h-max gap-2">
            <Button
              className="flex flex-1 gap-2 text-lg py-8"
              {...(workoutProps.isPaused ? { disabled: true } : {})}
              onClick={() =>
                setWorkoutProps({ isStopPressed: true, isPaused: true })
              }
              variant={!workoutProps.isPaused ? "destructive" : "outline"}>
              <Square fill="currentColor" />
              Stop
            </Button>

            <Button
              className="flex flex-1 gap-2 text-lg py-8"
              onClick={() => {
                if (!workoutProps.isPaused)
                  setWorkoutProps({ ...workoutProps, isPaused: true })
                else setWorkoutProps({ ...workoutProps, isPaused: false })
              }}>
              {!workoutProps.isPaused ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" />
              )}
              {!workoutProps.isPaused ? "Pause" : "Start"}
            </Button>
          </section>
          <section className="border h-full flex flex-1 rounded-lg p-4"></section>
        </section>
      </div>
    </main>
  )
}
