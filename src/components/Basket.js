import React from 'react'
import useBasket from '../hooks/useBasket'

const Basket = () => {
  const { basketItems, totalAmount } = useBasket()
  return (
    <div className={'basket'}>
      <div className={'basket-inside'}>
        {basketItems.length > 0 && (
          <>
            {basketItems.map((basketItem) => (
              <div className={'item'} key={basketItem.NID}>
                <span>{basketItem.OC.MBS}</span>
                <span>Kod: {basketItem.C}</span>
                <span>Maç: {basketItem.N}</span>
                <span>
                  <b>Oran: {basketItem.OC.O}</b>
                </span>
              </div>
            ))}
            <hr />
          </>
        )}
        <div className={'total'}>Toplam tutar: {totalAmount} TL</div>
      </div>
    </div>
  )
}

export default Basket
