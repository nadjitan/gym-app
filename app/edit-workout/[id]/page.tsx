import { EditWorkoutForm } from "@/components/workouts/forms"

export default function EditWorkout({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-full w-full flex-col gap-2 animate-in fade-in md:max-w-6xl md:flex-row">
      <EditWorkoutForm workoutId={params.id} />
    </div>
  )
}
