import React from 'react'
import moment from 'moment'
import './Order.css'
import CheckoutProduct from './CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import {nanoid} from 'nanoid'

function Order({order}) {
  return (
    <div className='order'>
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
        <p className='order_id'>
            <small>{order.id}</small>
        </p>
        {
            order.data.basket?.map(item =>( 
                <CheckoutProduct 
                    key={nanoid()}
                    id = {item.id}
                    title = {item.title}
                    price = {item.price}
                    rating = {item.rating}
                    image = {item.image}
                    hideButton
                />
            ))
        }
        <CurrencyFormat 
            renderText={(value) => (
                <h3 className='order_total'>Order Total: {value}</h3>
            )}
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₹'}
        />
    </div>
  )
}

export default Order