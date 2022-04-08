import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'

function Checkout() {
    const [{basket, user}] = useStateValue()
  return (
    <div className='checkout'>
        <div className='checkout_left'>
            <img 
                className='checkout_ad' 
                src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.JPG' 
                alt='ad' 
            />

            <div>
                <h4>Hello, {user?.email}</h4>
                <h2 className='checkout_title'>
                    Your Shopping Basket
                </h2>
                
                {basket.map(item => (
                    <CheckoutProduct 
                        key = {item.id}
                        id = {item.id}
                        title = {item.title}
                        price = {item.price}
                        rating = {item.rating}
                        image = {item.image}
                    />
                ))}
            </div>
        </div>
        <div className='checkout_right'>
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout