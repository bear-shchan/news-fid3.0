export function stockColor (el, binding) {
  if (binding.value > 0) {
    el.style.color = '#e2666d'
  } else if (binding.value < 0) {
    el.style.color = '#4a9a69'
  } else {
    el.style.color = '#606060'
  }
}
