import { VALIDATOR_REQUIRE } from '../../utils/validators';
import { categoryOptions } from '../../utils/categoryList';

import Input from '../ui/FormElements/Input';
import ImageUpload from '../ui/FormElements/ImageUpload';
import Button from '../ui/FormElements/button';

import { useRouter } from 'next/router';
import useForm from '../../hooks/use-form';

import axios from 'axios';

import classes from './RestaurantForm.module.css';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

const NewRestaurant = () => {
  const { userId } = useContext(AuthContext);
  const router = useRouter();

  const [formState, inputHandler] = useForm(
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

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formState.isValid) {
      return;
    }

    try {
      // setIsLoading(true);

      const formData = new FormData();

      formData.append('ownerId', userId);
      formData.append('name', formState.inputs.name.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('category', formState.inputs.category.value);
      formData.append('image', formState.inputs.image.value);

      const response = await axios.post(
        'http://localhost:8000/owner/add-restaurant',
        formData
      );

      const restaurantId = response.data.restaurantId;

      router.replace(`/restaurants/${restaurantId}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Restaurant Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Restaurant's name must not be empty."
        onInput={inputHandler}
      />

      <Input
        id="address"
        element="input"
        label="Restaurants's Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Restaurants's Address must not be empty."
        onInput={inputHandler}
      />

      <Input
        id="category"
        element="select"
        label="Restaurants's Category"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Restaurants's Category must not be empty."
        onInput={inputHandler}
        options={categoryOptions}
      />

      <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image."
      />

      <div className={classes.actions}>
        <Button>Add Restaurant</Button>
      </div>
    </form>
  );
};

export default NewRestaurant;
