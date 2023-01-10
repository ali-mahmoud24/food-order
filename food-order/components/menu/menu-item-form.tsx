import React, { useRef, useState } from 'react';

import ItemInput from './menu-Input';
import classes from './MenuItemForm.module.css';

const MealItemForm: React.FC<{
  onAddTocart: (enteredAmountNumber: number) => void;
  id: string;
}> = (props) => {
  const [amountIsValid, setAmountIsvalid] = useState(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current!.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsvalid(false);
      return;
    }

    props.onAddTocart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <ItemInput
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add to cart</button>
      {!amountIsValid && <p>Please enter a valid anount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
