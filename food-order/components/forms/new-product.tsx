import { VALIDATOR_REQUIRE } from '../../utils/validators';

import Input from '../ui/FormElements/Input';
import ImageUpload from '../ui/FormElements/ImageUpload';
import Button from '../ui/FormElements/button';

import { useRouter } from 'next/router';
import useForm from '../../hooks/use-form';

import axios from 'axios';

import classes from './product-form.module.css';

const NewProduct = () => {
  const router = useRouter();
  const { restaurantId } = router.query;

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      price: {
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

      formData.append('restaurantId', '63b9e3f106c882e26fefded4');
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('price', formState.inputs.price.value);
      formData.append('image', formState.inputs.image.value);

      const data = await axios.post(
        `http://localhost:8000/owner/${restaurantId}/add-product`,
        formData
      );

      // const { restaurantId } = data;
      // console.log(restaurantId);

      // setIsLoading(false);

      router.replace(`/restaurants/${restaurantId}`);
      console.log('SUBMITTED');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Product title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Product's title must not be empty."
        onInput={inputHandler}
      />

      <Input
        id="description"
        element="input"
        label="Product Description (Not required)"
        // validators={[VALIDATOR_REQUIRE()]}
        // errorMessage="Product's Description must not be empty."
        onInput={inputHandler}
      />

      <Input
        id="price"
        element="number"
        label="Product price"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Product's price must not be empty."
        onInput={inputHandler}
      />

      <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image."
      />

      <div className={classes.actions}>
        <Button submit>Add Product</Button>
      </div>
    </form>
  );
};

export default NewProduct;
