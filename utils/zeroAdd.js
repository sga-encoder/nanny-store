export const zeroAdd = (number) => {
  if (number <= 9) {
    return '000' + number
  } else if (number <= 99) {
    return '00' + number
  } else if (number <= 999) {
    return '0' + number
  } else if (number <= 9999) {
    return number
  }
}
