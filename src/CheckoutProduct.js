import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'
import { useNavigate } from 'react-router-dom'

function CheckoutProduct({id, image, title, price, rating, hideButton}) {
    const [{basket}, dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct_image' src={image} alt='cartItem' />
        <div className='checkoutProduct_info'>
            <p className='checkoutProduct_title'>{title}</p>
            <p className='checkoutProduct_price'>
                <small>₹</small>
                <strong>{price}</strong>
            </p>
            <div className='product_rating'>
                {Array(rating).fill().map((_, i)=> (
                    <p key={i}>⭐</p>
                ))}
            </div>
            {!hideButton && <button onClick={removeFromBasket}>Remove from Basket</button>}
        </div>
    </div>
  )
}

export default CheckoutProduct