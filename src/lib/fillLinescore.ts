export const fillLinescore = (arr: string[]) => {
  if (arr.length < 9) {
    arr.push('-')
    fillLinescore(arr)
  }
  return arr
}
