const info = (...params: unknown[]) => {
  if (process.env.NODE_ENV !== 'tes') {
    console.log(...params)
  }
}

const error = (...params: unknown[]) => {
  if (process.env.NODE_ENV !== 'tes') {
    console.error(...params)
  }

}

export default { info, error }