import { ThemeToggle } from "@/components/theme-toggle"
import WorkoutList from "@/components/workouts/workout-list"
import { Dumbbell } from "lucide-react"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-14">
      <nav className="fixed left-0 top-0 z-10 flex w-full max-w-6xl items-center justify-between border-b border-gray-300 p-4 text-sm dark:border-neutral-800 lg:static lg:flex">
        <div className="flex select-none items-center gap-3">
          <Dumbbell strokeWidth={2.7} size={32} />
          <h1 className="text-3xl font-black tracking-widest">FITNESS</h1>
        </div>
        <ThemeToggle />
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={5}>
              <p>Change theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
      </nav>

      <div className="mt-12 flex h-full flex-1 flex-wrap place-content-center gap-2 overflow-y-auto overflow-x-hidden text-center lg:mb-0 lg:mt-4 lg:w-full lg:max-w-6xl lg:place-content-start lg:text-left">
        <WorkoutList />
      </div>

      <footer className="mt-auto text-gray-400">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 text-sm lg:pointer-events-auto lg:p-0"
          href="https://nadjitan.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          By <b>Nadji Tan</b>
        </a>
      </footer>
    </main>
  )
}
