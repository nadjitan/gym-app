import { useState, useEffect } from "react"

export default function useTimer(initialTime: number) {
  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else {
      clearInterval(interval!)
    }

    return () => clearInterval(interval)
  }, [isActive])

  const startTimer = () => {
    setIsActive(true)
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(initialTime)
  }

  return {
    progress: time,
    isActive,
    setTime,
    startTimer,
    pauseTimer,
    resetTimer,
  }
}
