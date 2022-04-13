import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home'
import{ BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login'
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './Orders';

const promise = loadStripe('pk_test_51KmCeNSDFeW3uiPTlyj0qaZKHncGP9I1hAnfPUq6W5ShxMaLweFYoPhwRYJyQOrtH5TND7GyEieo2FbZ8sIQkPiq00YDRpmVPZ')

function App() {
  const [state, dispatch] = useStateValue()

  React.useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path='/login' element={<Login  key={2}/>} />
          <Route path='/checkout' element={[<Header  key={0}/>, <Checkout  key={1}/>]} />
          <Route path='/orders' element={[<Header  key={9}/>, <Orders key={8} />]} />
          <Route path='/payment' element={[<Header  key={3}/>,
            <Elements stripe={promise}  key={4}>
              <Payment  key={5}/>
            </Elements>
          ]} />
          
          <Route path='/' element={[<Header  key={6}/>, <Home  key={7}/>]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
