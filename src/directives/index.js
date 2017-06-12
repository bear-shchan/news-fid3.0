export function stockColor (el, binding) {
  if (binding.value > 0) {
    el.style.color = 'red'
  } else if (binding.value < 0) {
    el.style.color = 'green'
  } else {
    el.style.color = 'gray'
  }
}
