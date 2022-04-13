import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import {Link} from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { auth } from './firebase'

function Header() {
  const [{basket, user}] = useStateValue()

  const handleAuthentication = () => {
    if(user){
      auth.signOut()
    }
  }

  return (
    <div className='header'>
        <Link to='/'>
          <img 
            className='header_logo' 
            src='https://pngimg.com/uploads/amazon/amazon_PNG25.png' 
            alt='logo'
          />
        </Link>
        <div className='header_search'>
          <input className='header_search_input' type='text' />
          <SearchIcon className='header_searchIcon' />
        </div>
        <div className='header_nav'>
          <Link to={!user && '/login'}>
            <div onClick={handleAuthentication} className='header_option'>
              <span className='header_option_line1'>{user ? `Hello ${user.email}` : 'Hello Guest'}</span>
              <span className='header_option_line2'>{user ? 'Sign Out' : 'Sign In'}</span>
            </div>
          </Link>
            
          <Link to='/orders'>
            <div className='header_option'>
              <span className='header_option_line1'>Returns</span>
              <span className='header_option_line2'>& Orders</span>
            </div>
          </Link>
          <div className='header_option'>
            <span className='header_option_line1'>Your</span>
            <span className='header_option_line2'>Prime</span>
          </div>
          <Link to='/checkout'>
            <div className='header_optionBasket'>
              <ShoppingBasketIcon />
              <span className='header_option_line2 header_basketCount'>{basket?.length}</span> 
            </div>
          </Link>
        </div>
    </div>

  )
}

export default Header