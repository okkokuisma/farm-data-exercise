import axiosInstance from './axiosConfig'
axiosInstance.defaults.withCredentials = true

export const getStats = async (params) => {
  const response = await axiosInstance.get('/stats', { params })
  return response.data
}

export const formatStats = (stats, labelGroup) => {
  const initialValue = {labels: [], min: [], max: [], mean: []}
  if (stats) {
    return stats.reduce((b, a) => {
      const { time, min, max, mean } = a
      const label = formatDateLabel(time, labelGroup)
      b.labels.push(label)
      b.min.push(min)
      b.max.push(max)
      b.mean.push(mean)
      return b
    }, initialValue)
  } else {
    return initialValue
  }
}

const formatDateLabel = (date, labelGroup) => {
  return labelGroup === 'month'
    ? new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' })
    : labelGroup === 'year'
      ? new Date(date).toLocaleString('default', { year: 'numeric' })
      : new Date(date).toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default { getStats }