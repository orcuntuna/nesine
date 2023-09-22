import { useEffect, useState } from 'react'
import ApiService from '../services/ApiService'

const useBets = () => {
  const [loading, setLoading] = useState(false)
  const [bets, setBets] = useState([])

  useEffect(() => {
    loadBets()
  }, [])

  const loadBets = async () => {
    setLoading(true)
    try {
      const bets = await ApiService.getBets()
      setBets(bets)
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { bets }
}

export default useBets
