import React, { useEffect, useContext } from 'react';

import { VALIDATOR_REQUIRE } from '../../utils/validators';
import { categoryOptions } from '../../utils/categoryList';

import { useState } from 'react';

import Input from '../ui/FormElements/Input';
import Button from '../ui/FormElements/button';

import { useRouter } from 'next/router';
import useForm from '../../hooks/use-form';

import axios from 'axios';

import classes from './RestaurantForm.module.css';
import Restaurant from '../../models/restaurant';

const UpdateRestaurant = () => {
  const [loadedRestaurant, setLoadedRestaurant] = useState<Restaurant>();
  const [isLoading, setIsLoading] = useState(false);

  // const { token } = useContext(AuthContext);

  const router = useRouter();

  const { restaurantId } = router.query;
  if (!restaurantId) {
    return <div>Loading...</div>;
  }
  console.log('///////////////////////////////////////////');

  console.log(router.query);
  console.log('///////////////////////////////////////////');

  console.log(restaurantId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      category: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/owner/restaurants/${restaurantId}`
        );
        setIsLoading(false);

        const restaurant = response.data.restaurant;

        setLoadedRestaurant(restaurant);

        setFormData(
          {
            name: {
              value: restaurant.name,
              isValid: true,
            },
            address: {
              value: restaurant.address,
              isValid: true,
            },
            category: {
              value: restaurant.category,
              isValid: true,
            },
            image: {
              value: null,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchRestaurant();
  }, [setFormData, restaurantId]);

  const restaurantUpdateSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:8000/owner/restaurants/${restaurantId}`,
        {
          name: formState.inputs.name.value,
          address: formState.inputs.address.value,
          category: formState.inputs.category.value,
        }
      );

      console.log('///////////////////////////////////////////');
      console.log(response);
      console.log('///////////////////////////////////////////');

      router.replace(`/restaurants/${restaurantId}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (loadedRestaurant == null) return null;

  return (
    <form onSubmit={restaurantUpdateSubmitHandler} className={classes.form}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Restaurant Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Restaurant's name must not be empty."
        onInput={inputHandler}
        initialValue={loadedRestaurant.name}
      />

      <Input
        id="address"
        element="input"
        label="Restaurants's Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Restaurants's Address must not be empty."
        onInput={inputHandler}
        initialValue={loadedRestaurant.address}
      />

      <Input
        id="category"
        element="select"
        label="Restaurants's Category"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Restaurants's Category must not be empty."
        onInput={inputHandler}
        options={categoryOptions}
        initialValue={loadedRestaurant.category}
      />

      <div className={classes.actions}>
        <Button submit>Add Restaurant</Button>
      </div>
    </form>
  );
};

export default UpdateRestaurant;
