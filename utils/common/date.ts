export function getFormattedDate(date: Date, format: string): string {
  const symbol: { [key: string]: number } = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  }

  const formatted = format.replace(/(M+|d+|h+|m+|s+)/g, (v) =>
    ((v.length > 1 ? '0' : '') + symbol[v.slice(-1)]).slice(-2)
  )

  return formatted.replace(/(y+)/g, (v) =>
    date.getFullYear().toString().slice(-v.length)
  )
}
