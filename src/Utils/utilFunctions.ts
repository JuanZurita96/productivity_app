import { TaskState } from '../Interfaces/Task'

export const generateTasks = (numberOfTasks: number) => {
  const titles = [
    'Comprar comida',
    'Hacer ejercicio',
    'Estudiar programación',
    'Hacer la cama',
    'Limpiar el baño',
    'Salir al cine',
    'Terminar el proyecto',
  ]
  const taskList = []

  for (let i = 0; i < numberOfTasks; i++) {
    const lastSevenDays = Math.floor(Math.random() * 7)
    const date = new Date()
    date.setDate(date.getDate() - lastSevenDays)
    const timeLimit = Math.floor(Math.random() * 121)
    const hours = Math.floor(timeLimit / 60)
    const minutes = timeLimit % 60
    const seconds = (timeLimit * 60) % 60
    const visualTimeLimit = `${hours > 0 ? hours + ':' : '0:'}${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    const getCompletionTime = (time: number) => {
      const timeLimitPerTask = time * 60
      const minValueToComplete = timeLimitPerTask * 0.8
      return `${Math.floor(
        (Math.random() * (timeLimitPerTask - minValueToComplete + 1) +
          minValueToComplete) /
          60
      )}`
    }

    const newTask = {
      id: i + 1,
      status: 'completed' as const,
      title: titles[Math.floor(Math.random() * titles.length)],
      duration: visualTimeLimit,
      creationDate: date.toLocaleDateString(),
      completionTime: getCompletionTime(timeLimit),
    }
    taskList.push(newTask)
  }

  return taskList
}

export const transformDate = (date: string, count: Map<string, number>) => {
  const [day, month, year] = date.split('/')
  const formattedDate = `${month}/${day}/${year}`
  const dateString = new Date(formattedDate)
  const dayString = dateString.getDate()
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  const monthIndex = dateString.getMonth()
  const monthName = monthNames[monthIndex]
  const formattedStringDate = `${dayString} de ${monthName}`
  if (count.has(formattedStringDate)) {
    count.set(formattedStringDate, count.get(formattedStringDate)! + 1)
  } else {
    count.set(formattedStringDate, 1)
  }
  return formattedStringDate
}

export const findTask = (state: TaskState, id: number) =>
  state.activeTasks.findIndex((task) => task.id === id)

export const getCompletionTime = (taskDuration: string, timeLeft: number) => {
  const durationInSeconds = parseInt(taskDuration) * 60
  const completionTime = Math.floor((durationInSeconds - timeLeft) / 60)
  return completionTime.toString()
}

export const getColorChip = (status: string) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'paused':
      return 'info'
    case 'wait':
      return 'default'
    case 'completed':
      return 'success'
  }
}

export const getLabelStatus = (status: string) => {
  switch (status) {
    case 'active':
      return 'En curso'
    case 'paused':
      return 'Pausada'
    case 'wait':
      return 'Pendiente'
    case 'completed':
      return 'Completada'
  }
}
