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
  type: "work" | "rest"
  duration: number
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

export const initialData: Workout[] = [
  {
    id: "0",
    creator: "Nadji Tan",
    position: 0,
    type: "timer",
    title: "Legs Workout",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    target: "Legs",
    items: [
      { name: "Squats", type: "work", duration: 3, sets: 0, repetitions: 0 },
      { name: "Rest", type: "rest", duration: 3, sets: 0, repetitions: 0 },
      {
        name: "Barbell Squat",
        type: "work",
        duration: 3,
        sets: 0,
        repetitions: 0,
      },
    ],
    dateCreated: "2023-09-09T03:35:59.456Z",
  },
  {
    id: "1",
    creator: "Nadji Tan",
    position: 1,
    type: "list",
    title: "Arms Workout",
    description:
      "Felis imperdiet proin fermentum leo. Ante metus dictum at tempor commodo.",
    target: "Arms",
    items: [
      {
        name: "Dumbell curls",
        type: "work",
        duration: 0,
        sets: 3,
        repetitions: 12,
      },
      { name: "Rest", type: "rest", duration: 3, sets: 0, repetitions: 0 },
      {
        name: "Rope Pulldowns",
        type: "work",
        duration: 0,
        sets: 3,
        repetitions: 12,
      },
    ],
    dateCreated: "2023-09-09T03:35:59.456Z",
  },
]

const WorkoutItem: React.FC<{ workout: Workout }> = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group grid h-44 w-52 place-content-start gap-2 rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className={`text-xl font-semibold`}>
        {workout.title}
        {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span> */}
      </h2>
      <p className={`line-clamp-2 text-sm font-extralight opacity-50`}>
        {workout.description}
      </p>

      <ul className="line-clamp-3 h-full overflow-hidden">
        {workout.items.map((ex) => (
          <>
            <li className={`text-sm opacity-50`}>
              - {ex.name}{" "}
              <span className="text-xs">
                {ex.duration === 0
                  ? `${ex.sets}x${ex.repetitions}`
                  : `${ex.duration.toString()}s`}
              </span>
            </li>
          </>
        ))}
      </ul>
    </Link>
  )
}

export default function WorkoutList() {
  return (
    <>
      {initialData.map((item) => (
        <WorkoutItem key={`workout-${item.id}`} workout={item} />
      ))}
    </>
  )
}
