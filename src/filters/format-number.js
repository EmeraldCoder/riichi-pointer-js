export default value => {
  if (value == null) return value
  return Intl.NumberFormat('en-US').format(value)
}
