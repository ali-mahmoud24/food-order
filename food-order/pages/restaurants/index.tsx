import ResturantList from '../../components/restaurants/restaurant-list'

import { GetStaticProps } from 'next'
import Restaurant from '../../models/restaurant'

import axios from 'axios'
import { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth-context'
import { useRouter } from 'next/router'

const AllRestaurantsPage: React.FC<{ restaurants: Restaurant[] }> = props => {
  const { isLoggedIn } = useContext(AuthContext)
  const { restaurants } = props

  const router = useRouter()
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [router, isLoggedIn])

  if (!isLoggedIn || !restaurants) {
    return <div>Loading...</div>
  }

  if (restaurants.length === 0) {
    return <div>Sorry, no restaurants available now.</div>
  }

  return (
    <>
      <ResturantList restaurants={restaurants} />;
    </>
  )
}

export default AllRestaurantsPage

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(`http://localhost:8000/client/restaurants`)

  const { restaurants } = response.data

  if (!restaurants) {
    return { notFound: true }
  }

  return {
    props: {
      restaurants: restaurants,
    },
    revalidate: 100,
  }
}
