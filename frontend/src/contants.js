export const metricTypeSelectOptions = [
  {name: 'All', value: ''},
  {name: 'Rain fall', value: 'rainFall'},
  {name: 'Temperature', value: 'temperature'},
  {name: 'pH', value: 'pH'},
]

export const timeIntervalSelectOptions = [
  {name: 'Time interval', value: ''},
  {name: 'Day', value: 'day'},
  {name: 'Month', value: 'month'},
  {name: 'Year', value: 'year'},
]

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
}