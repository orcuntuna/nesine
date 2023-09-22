import React, { createContext, useState } from 'react'

export const BasketContext = createContext(undefined)

export const BasketProvider = ({ children }) => {
  // basketItem: { NID, C, N, OC }
  const [basketItems, setBasketItems] = useState([])

  const contextValue = {
    basketItems,
    setBasketItems,
  }

  return <BasketContext.Provider value={contextValue}>{children}</BasketContext.Provider>
}
