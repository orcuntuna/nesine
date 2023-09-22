import React from 'react'
import Basket from './components/Basket'
import { BasketProvider } from './contexts/BasketContext'
import { BetsList } from './components/BetsList'

const App = () => {
  return (
    <BasketProvider>
      <BetsList />
      <Basket />
    </BasketProvider>
  )
}

export default App
