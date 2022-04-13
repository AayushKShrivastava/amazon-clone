import React, {useState, useEffect} from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import { getBasketTotal } from './reducer'
import CurrencyFormat from 'react-currency-format'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import axios from './axios'
import {db} from './firebase'

function Payment() {
  const [{basket, user}, dispatch] = useStateValue()
  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if(getBasketTotal(basket)){
      const getClientSecret = async () => {
        const response = await axios({
          method: 'post',
          url: `/payment/create?total=${Math.round(getBasketTotal(basket) * 100)}`,
        })
        setClientSecret(response.data.clientSecret)
      }
      getClientSecret()
    }else {
      navigate('/')
    }
  }, [basket])

  console.log('The secret key is >>> ', clientSecret)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) => {
      db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })

      setSucceeded(true)
      setError(null)
      setProcessing(false)
      dispatch({
        type: 'EMPTY_BASKET'
      })
      navigate('/orders', {replace:true})
    })
  }

  const handleChange = event => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  return (
    <div className='payment'>
        <div className='payment_container'>

          <h1>
            Checkout ({
              <Link to='/checkout'>{basket?.length} items</Link>
            })
          </h1>

          <div className='payment_section' >
            <div className='payment_title'>
              <h3>Deliver Address</h3>
            </div>
            <div className='payment_address'>
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Madhya Pradesh, India</p>
            </div>
          </div>

          <div className='payment_section'>
            <div className='payment_title'>
              <h3>Review items and delivery</h3>
            </div>
            <div className='payment_items'>
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

          <div className='payment_section'>
            <div className='payment_title'>
              <h3>Payment Method</h3>
            </div>
            <div className='payment_details'>
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className='payment_priceContainer'>
                  <CurrencyFormat 
                    renderText={(value) => (<h3 className='payment_total'>Order Total: {value}</h3>)}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'₹'}
                  />
                  <button disabled={processing || disabled || succeeded} className='payment_buyNow'>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Payment