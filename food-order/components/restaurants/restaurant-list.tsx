import Restaurant from '../../models/restaurant'

import ResturantsSearch from './restaurants-search'
import ResturantItem from './restaurant-item'

import { useMemo, useState } from 'react'

import classes from './restaurant-list.module.css'

const ResturantList: React.FC<{ restaurants: Restaurant[] }> = props => {
  const { restaurants } = props
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  const findRestaurantsHandler = ({ name, category }) => {
    if (name !== undefined) {
      setName(name)
    }

    if (category !== undefined) {
      setCategory(category)
    }
  }

  const filteredRestaurants = useMemo(
    () =>
      restaurants.filter(
        (restaurant: Restaurant) =>
          restaurant.name.toLowerCase().includes(name.toLowerCase()) &&
          (category ? restaurant.category === category : true),
      ),
    [restaurants, name, category],
  )

  return (
    <>
      <ResturantsSearch onSearch={findRestaurantsHandler} name={name} category={category} />

      <ul className={classes.list}>
        {filteredRestaurants.map((restaurant: Restaurant) => (
          <ResturantItem
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            image={restaurant.image}
            category={restaurant.category}
            address={restaurant.address}
          />
        ))}
      </ul>
    </>
  )
}

export default ResturantList
