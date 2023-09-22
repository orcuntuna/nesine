import React, { useCallback, useContext, useMemo, useState } from 'react'
import { BasketContext } from '../contexts/BasketContext'

const useBasket = () => {
  const basketContext = useContext(BasketContext)

  const totalAmount = useMemo(() => {
    if (basketContext.basketItems.length === 0) {
      return 0
    }

    return Number(
      basketContext.basketItems.reduce((prev, current) => prev * current.OC.O, 1),
    ).toFixed(2)
  }, [basketContext.basketItems])

  const isBetSelected = useCallback(
    (betId, ocId) => {
      return basketContext.basketItems.some((item) => item.NID === betId && item.OC.ID === ocId)
    },
    [basketContext.basketItems],
  )

  const toggleBet = (bet, oc) => {
    const basketItem = {
      NID: bet.NID,
      C: bet.C,
      N: bet.N,
      OC: oc,
    }

    const existsBetIndex = basketContext.basketItems.findIndex((item) => item.NID === bet.NID)

    if (existsBetIndex === -1) {
      basketContext.setBasketItems((items) => [...items, basketItem])
      return
    }

    if (basketContext.basketItems[existsBetIndex].OC.ID === oc.ID) {
      basketContext.setBasketItems((items) => items.filter((item) => item.NID !== bet.NID))
      return
    }

    const clone = [...basketContext.basketItems]
    clone[existsBetIndex] = basketItem
    basketContext.setBasketItems(clone)
  }

  return {
    basketItems: basketContext.basketItems,
    toggleBet,
    totalAmount,
    isBetSelected,
  }
}

export default useBasket
