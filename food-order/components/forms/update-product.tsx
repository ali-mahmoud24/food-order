import { VALIDATOR_REQUIRE } from '../../utils/validators';
import { useEffect, useState } from 'react';
import Product from '../../models/product';

import { useRouter } from 'next/router';

import useForm from '../../hooks/use-form';

import Input from '../ui/FormElements/Input';
import Button from '../ui/FormElements/button';

import axios from 'axios';

import classes from './product-form.module.css';

const UpdateProduct = () => {
  const [loadedProduct, setLoadedProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { restaurantId, productId } = router.query;

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
        const response = await axios.get(
          `http://localhost:8000/owner/restaurants/${restaurantId}/${productId}`
        );
        setIsLoading(false);

        const product = response.data.product;

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
  }, [setFormData, restaurantId, productId]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (loadedProduct == null) return null;

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
        label="Product Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Product's Description must not be empty."
        onInput={inputHandler}
        initialValue={loadedProduct.description}
      />

      <Input
        id="price"
        element="input"
        type='number'
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
