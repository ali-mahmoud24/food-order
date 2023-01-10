import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { useState } from 'react'

import AuthContext from '../context/auth-context'
import { useAuth } from '../hooks/use-auth'

import CartProvider from '../store/CartProvider'
import Cart from '../components/Cart/Cart'

import Layout from '../components/Layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const { token, login, logout, userId, isOwner } = useAuth()

  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}

      <AuthContext.Provider
        value={{
          isLoggedIn: token ? true : false,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
          isOwner,
        }}
      >
        <Layout onShowCart={showCartHandler}>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </CartProvider>
  )
}
