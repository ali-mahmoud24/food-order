import React, { useReducer, useEffect } from 'react';

import { validate } from '../../../utils/validators';
import classes from './Input.module.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  let element;

  switch (props.element) {
    case 'input':
      element = (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
      break;

    case 'textarea':
      element = (
        <textarea
          id={props.id}
          rows={props.rows || 3}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      );
      break;
    case 'select':
      element = (
        <select
          id={props.id}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        >
          <option value="">{props.label}</option>
          {props.options}
        </select>
      );
      break;
    default:
      element = null;
  }

  // const element =
  //   props.element === 'input' ? (
  //     <input
  //       id={props.id}
  //       type={props.type}
  //       placeholder={props.placeholder}
  //       onChange={changeHandler}
  //       onBlur={touchHandler}
  //       value={inputState.value}
  //     />
  //   ) : (
  //     <textarea
  //       id={props.id}
  //       rows={props.rows || 3}
  //       onChange={changeHandler}
  //       onBlur={touchHandler}
  //       value={inputState.value}
  //     />
  //   );

  return (
    <div
      className={`${classes['form-control']} ${
        !inputState.isValid &&
        inputState.isTouched &&
        classes['form-control--invalid']
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p>{props.errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
