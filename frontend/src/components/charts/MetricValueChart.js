import React from 'react'

import LineChart from './LineChart'
import { chartOptions } from '../../contants'

const MetricValueChart = ({stats}) => {
  const { labels, min, max, mean } = stats

  const chartData = {
    labels,
    datasets: [
      ... min
        ? [{
          label: 'Min',
          data: min,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
        : []
      ,
      ... max
        ? [{
          label: 'Max',
          data: max,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
        : []
      ,
      ... mean
        ? [{
          label: 'Average',
          data: mean,
          borderColor: 'rgb(175, 63, 212)',
          backgroundColor: 'rgba(175, 63, 212, 0.5)',
        }]
        : []
    ],
  }

  return (
    <LineChart options={chartOptions} data={chartData} />
  )
}

export default MetricValueChart