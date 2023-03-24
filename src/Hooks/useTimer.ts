import React from 'react'
import { Task } from '../Interfaces/Task'

export const useTimer = (task: Task) => {
  const [timeLeft, setTimeLeft] = React.useState(parseInt(task.duration) * 60)
  const [timerOn, setTimerOn] = React.useState(false)
  const intervalRef = React.useRef(0)

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(1, '0')
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  React.useEffect(() => {
    switch (task.status) {
      case 'active':
        setTimerOn(true)
        break
      case 'paused':
      case 'stopped':
        setTimerOn(false)
        break
      case 'wait':
        setTimerOn(false)
        setTimeLeft(parseInt(task.duration) * 60)
        break
    }
    if (timerOn && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [timerOn, timeLeft, task])

  return {
    timeLeft,
    formatTime,
  }
}
