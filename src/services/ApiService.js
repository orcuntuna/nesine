const ApiService = {
  async getBets() {
    return new Promise(async (resolve) => {
      const response = await fetch('https://nesine-case-study.onrender.com/bets')
      const data = await response.json()
      resolve(data)
    })
  },
}

export default ApiService
