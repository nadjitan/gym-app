import Link from "next/link"
import { ArrayToUnion } from "@/utils/types"

export const WORKOUT_TARGET = [
  "Full Body",
  "Chest",
  "Legs",
  "Triceps",
  "Biceps",
  "Arms",
  "Upper Body",
  "Abs",
] as const

export type Exercise = {
  name: string
  time: number
  repetitions: number
  sets: number
}

export type Workout = {
  id?: string
  creator: string
  position: number
  type: "list" | "timer"
  title: string
  description: string
  target: ArrayToUnion<typeof WORKOUT_TARGET>
  items: Exercise[]
  dateCreated: string
}

const WorkoutItem: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group rounded-lg border border-transparent px-5 py-4 w-52 h-44 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className={`mb-3 text-xl font-semibold`}>
        {workout.title}
        {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span> */}
      </h2>
      <p className={`m-0 text-sm opacity-50`}>{workout.description}</p>
    </Link>
  )
}

export const initialData: Workout[] = [
  {
    id: "0",
    creator: "Nadji Tan",
    position: 0,
    type: "timer",
    title: "Legs Workout",
    description: "Sample workout item",
    target: "Legs",
    items: [
      { name: "Squats", time: 30, sets: 0, repetitions: 0 },
      { name: "Barbell Squat", time: 10, sets: 0, repetitions: 0 },
    ],
    dateCreated: "2023-09-09T03:35:59.456Z",
  },
  {
    id: "1",
    creator: "Nadji Tan",
    position: 1,
    type: "list",
    title: "Arms Workout",
    description: "Sample list",
    target: "Arms",
    items: [
      { name: "Dumbell curls", time: 0, sets: 3, repetitions: 12 },
      { name: "Rope Pulldowns", time: 0, sets: 3, repetitions: 12 },
    ],
    dateCreated: "2023-09-09T03:35:59.456Z",
  },
]

export default function WorkoutList() {
  return (
    <>
      {initialData.map(item => (
        <WorkoutItem workout={item} />
      ))}
    </>
  )
}
