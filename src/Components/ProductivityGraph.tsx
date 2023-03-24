import React from 'react'
import { Box, Typography } from '@mui/material'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory'
import { transformDate } from '../Utils/utilFunctions'
import { Task } from '../Interfaces/Task'

/**ProductivityGraph.tsx - Representa una grafica basada en la cantidad de tareas completadas en una fecha.
 * Recibe la lista de tareas completadas y tomamos la fecha de creacion de cada una.
 * Se usa un contador Map() para la cantidad de tareas por fecha.
 * Se usa la libreria Victory para representar una grafica de linea
 */

const ProductivityGraph = ({ tasks }: { tasks: Task[] }) => {
  const count = new Map<string, number>()
  if (tasks) tasks.map((task) => transformDate(task.creationDate, count))
  let dates: { x: string; y: number }[] = []

  for (const [key, value] of count) {
    dates = [...dates, { x: key, y: value }]
  }
  dates.sort((a, b) => a.x.localeCompare(b.x))

  return (
    <Box style={{ maxWidth: '88%', margin: '0 auto' }}>
      <Typography style={{ textAlign: 'center' }}>
        Cantidad de tareas por fecha
      </Typography>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 6, padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryLine
          data={dates}
          x="x"
          y="y"
          style={{
            data: { stroke: '#5F5AAA' },
          }}
        />
      </VictoryChart>
    </Box>
  )
}

export default ProductivityGraph
