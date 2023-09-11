import * as z from "zod"

export type Exercise = z.infer<typeof exerciseSchema>
export type Workout = z.infer<typeof workoutSchema>

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

export const exerciseSchema = z.object({
  id: z.string(),
  position: z.number(),
  name: z.string().min(1, {
    message: "Name must be at least 1 character..",
  }),
  type: z.union([z.literal("work"), z.literal("rest")]),
  duration: z.number(),
  repetitions: z.number(),
  sets: z.number(),
})
export const workoutSchema = z.object({
  id: z.string().optional(),
  creator: z.string(),
  position: z.number(),
  type: z.union([z.literal("list"), z.literal("timer")]),
  title: z.string().min(1, {
    message: "Title must be at least 1 character..",
  }),
  description: z.string(),
  target: z.enum(WORKOUT_TARGET),
  items: z.array(exerciseSchema).min(1, {
    message: "Workout must have at least 1 exercise.",
  }),
  dateCreated: z.string(),
})
