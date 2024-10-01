export function getFullDayAndDate(
  dateString: string = new Date().toISOString()
) {
  return dateString
}

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }
  return new Date(dateString).toLocaleDateString("en-US", options)
}
