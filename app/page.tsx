import { ThemeToggle } from "@/components/theme-toggle"
import WorkoutList from "@/components/workouts/workout-list"
import { Dumbbell } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-14 px-4">
      <nav className="z-10 max-w-6xl fixed lg:static p-4 border-b border-gray-300 dark:border-neutral-800 left-0 top-0 flex w-full items-center justify-between text-sm lg:flex">
        <div className="flex items-center gap-3 select-none">
          <Dumbbell strokeWidth={2.7} size={32} />
          <h1 className="font-black tracking-widest text-3xl">Gym App</h1>
        </div>
        <ThemeToggle />
      </nav>

      <div className="flex lg:max-w-6xl flex-wrap overflow-y-auto overflow-x-hidden place-content-center lg:place-content-start gap-2 mt-12 lg:mt-4 text-center lg:w-full lg:mb-0 lg:text-left">
        <WorkoutList />
      </div>

      <footer className="mt-auto text-gray-400">
        <a
          className="pointer-events-none text-sm flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://nadjitan.vercel.app"
          target="_blank"
          rel="noopener noreferrer">
          By <b>Nadji Tan</b>
        </a>
      </footer>
    </main>
  )
}
