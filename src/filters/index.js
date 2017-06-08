import momentfn from 'moment'
import contrastDate from '@/assets/js/contrastDate.js'

export function moment (value, param) {
  return momentfn(value).format(param)
}

export function toFixed (value) {
  return `${(value * 100).toFixed(2)}%`
}

export function formatTime (value) {
  return contrastDate(value)
}
