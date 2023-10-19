const optionsFormat = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false
}

const formatDate = (fecha) => fecha.toLocaleString('es-ES', optionsFormat)

export default formatDate
