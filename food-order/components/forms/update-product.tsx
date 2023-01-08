import React, { useEffect, useContext } from 'react';

import { VALIDATOR_REQUIRE } from '../../utils/validators';

import { useState } from 'react';

import Input from '../ui/FormElements/Input';
import Button from '../ui/FormElements/button';

import { useRouter } from 'next/router';
import useForm from '../../hooks/use-form';

import Product from '../../models/product';

import axios from 'axios';

import classes from './product-form.module.css';

const UpdateProduct = () => {
  const [loadedProduct, setLoadedProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  // const { token } = useContext(AuthContext);

  const router = useRouter();

  const { restaurantId } = router.query;

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
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const responseData = await axios.get(
          `http://localhost:8000/owner/restaurants/${restaurantId}/${productId}`
        );
        setIsLoading(false);
        // console.log(responseData.restaurant);

        const product = responseData.product;

        setLoadedProduct(product);

        setFormData(
          {
            title: {
              value: product.title,
              isValid: true,
            },
            description: {
              value: product.description,
              isValid: true,
            },
            price: {
              value: product.price,
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
    fetchProduct();
  }, [setFormData, restaurantId]);

  const productUpdateSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.patch(
        `http://localhost:8000/owner/restaurants/${restaurantId}/${productId}`,
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          price: formState.inputs.price.value,
        }
      );

      router.replace(`/restaurants/${restaurantId}`);
    } catch (err) {}
  };

  // console.log({ loadedDoctor, formState: formState.inputs.firstname.value });
  if (loadedProduct == null) return null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={productUpdateSubmitHandler} className={classes.form}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Product title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Product's title must not be empty."
        onInput={inputHandler}
        initialValue={loadedProduct.title}
      />

      <Input
        id="description"
        element="input"
        label="Product Description (Not required)"
        // validators={[VALIDATOR_REQUIRE()]}
        // errorMessage="Product's Description must not be empty."
        onInput={inputHandler}
        initialValue={loadedProduct.description}
      />

      <Input
        id="price"
        element="number"
        label="Product price"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Product's price must not be empty."
        onInput={inputHandler}
        initialValue={loadedProduct.price}
      />

      <div className={classes.actions}>
        <Button submit>Update Product</Button>
      </div>
    </form>
  );
};

export default UpdateProduct;
