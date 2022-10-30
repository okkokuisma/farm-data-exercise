import dayjs from 'dayjs'

export const getMetricValueChartTimeInterval = (params, farms) => {
  const { to, from } = params

  const [ earliestDataPoint, latestDataPoint ] = farms.reduce((a, b) => {
    const { earliestDataPoint: aEarliest, latestDataPoint: aLatest } = a
    const { earliestDataPoint: bEarliest, latestDataPoint: bLatest } = b
    return [
      ... dayjs(bEarliest).isBefore(dayjs(aEarliest)) ? [bEarliest] : [aEarliest],
      ... dayjs(bLatest).isAfter(dayjs(aLatest)) ? [bLatest] : [aLatest],
    ]
  }, [])

  const validTo = to
    ? to
    : dayjs(latestDataPoint)
  const validFrom = from
    ? from
    : dayjs(earliestDataPoint)

  return dayjs(validTo).diff(dayjs(validFrom), 'month') < 2
    ? 'day'
    : dayjs(validTo).diff(dayjs(validFrom), 'month') < 24
      ? 'month'
      : 'year'
}