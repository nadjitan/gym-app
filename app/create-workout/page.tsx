"use client"

import { useRouter } from "next/navigation"
import { ListRestart, MoveLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CreateWorkout() {
  const router = useRouter()
  return (
    <div className="flex h-full w-full flex-col gap-2 animate-in fade-in lg:max-w-6xl lg:flex-row">
      <section className="relative flex h-full flex-1 flex-col items-center overflow-hidden rounded-lg border p-4">
        <div className="flex h-max w-full justify-between">
          <Button
            className="flex gap-2 md:text-lg"
            variant={"ghost"}
            onClick={() => router.replace("/")}
          >
            <MoveLeft /> Exit
          </Button>

          <Button
            className="flex gap-2 md:text-lg"
            variant={"ghost"}
            onClick={() => {}}
          >
            <ListRestart /> Clear
          </Button>
        </div>
      </section>
      <section className="relative flex h-full flex-1 flex-col items-center overflow-hidden rounded-lg border p-4"></section>
    </div>
  )
}
