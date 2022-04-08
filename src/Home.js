import React from 'react'
import './Home.css'
import Product from './Product'
import {nanoid} from 'nanoid'

function Home() {
  return (
    <div className='home'>
      <div className='home_container'>
        <img className='home_banner' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._C8428684220_.jpg' alt='banner' />
        <div className='home_row'>
          <Product
            key={nanoid()}
            id = {nanoid()}
            title = 'The Lean Startup: How Constant Innovation Creates Radically Successful Business Paperback'
            price = {19.99}
            image = 'https://images-eu.ssl-images-amazon.com/images/I/51Zymoq7UnL.AC_SY400_.jpg'
            rating = {5}
          />
          <Product
            key={nanoid()}
            id = {nanoid()}
            title = 'Kenwood kMix Stand Mixer for Baking, Stylish Kichen Mixer with k-beater, Dough Hook and Whisk, 5 Litre Glass Bowl'
            price = {239}
            image = 'https://m.media-amazon.com/images/I/51yd+TT6YuL._SL1200_.jpg'
            rating = {4}
          />
        </div>
        <div className='home_row'>
          <Product
            key={nanoid()}
            id = {nanoid()}
            title = "Samsung LC87YTUHTI34UY4' Curved LED Gaming Monitor"
            price = {199.99}
            image = 'https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg'
            rating = {3}
          />
          <Product
            key={nanoid()}
            id = {nanoid()}
            title = 'Amazon Echo (3rd Generation) | Smart Speaker with Alexa, Charcoal Fabric'
            price = {98.99}
            image = "https://m.media-amazon.com/images/I/61EXU8BuGZL._SL1100_.jpg"
            rating = {5}
          />
          <Product
            key={nanoid()}
            id = {nanoid()}
            title = 'New Apple iPad Pro (12.9-inch, Wifi, 128GB) - Siver (4th Generation)'
            price = {598.99}
            image = 'https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg'
            rating = {4}
          />
        </div>
        <div className='home_row'>
        <Product
            key={nanoid()}
            id = {nanoid()}
            title = "Samsung LCirt798tu055ut8 49' Curved LED Gaming Monitor - Super Ultrawide Dual WQHD 5120 x 1440"
            price = {1098.55}
            image = 'https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg'
            rating = {4}
          />
        </div>
      </div>
    </div>
  )
}

export default Home