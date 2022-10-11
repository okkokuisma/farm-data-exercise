import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

const LineChart = ({ data, options }) => {
  return (
    <div style={{width: '60%'}}>
      <Line options={options} data={data} />
    </div>
  )
}

export default LineChart
