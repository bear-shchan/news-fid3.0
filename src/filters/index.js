import momentfn from 'moment'
import contrastDatefn from '@/assets/js/contrastDate.js'

export function moment (value, param) {
  return momentfn(value).format(param)
}

export function toFixed (value) {
  return `${(value * 100).toFixed(2)}%`
}

export function contrastDate (value) {
  return contrastDatefn(value)
}
