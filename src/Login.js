import React from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const signIn = e => {
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/')
            })
            .catch(error => alert(alert.message))
    }

    const register = e => {
       e.preventDefault()
       auth
           .createUserWithEmailAndPassword(email, password)
           .then((auth) => {
               console.log(auth)
               if(auth) {
                   navigate('/')
               }
           })
           .catch(error => alert(error.message))
    }
  return (
    <div className='login'>
        <Link to='/'>
            <img 
                className='login_logo' 
                src='https://pngimg.com/uploads/amazon/amazon_PNG24.png' 
                alt='amazon_logo'
            />
        </Link>
        <div className='login_container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input onChange={e => setEmail(e.target.value)} type='email' value={email}/>
                <h5>Password</h5>
                <input onChange={e => setPassword(e.target.value)} type='password' value={password}/>
                <button 
                    type='submit' 
                    className='login_signInButton'
                    onClick={signIn}
                >Sign In</button>
            </form>
            <p>
                By Signing in you agree to the AMAZON CLONE C onditions of Use & Sale. 
                Please see our Privacy Notice, our Cookie Notice and our Interest-Based Ads Notice.
            </p>
            <button onClick={register} className='login_registerButton'>Create your Amazon Account</button>
        </div>
    </div>
  )
}

export default Login