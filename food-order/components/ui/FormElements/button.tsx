import Link from 'next/link';
import React from 'react';

import classes from './button.module.css';

const Button: React.FC<{
  link?: string;
  onClick?: React.MouseEventHandler;
  submit?: boolean;
  className?: string;
  children: any;
}> = (props) => {
  if (props.link) {
    return (
      <Link
        href={props.link}
        className={`${classes.btn}${props.className ? props.className : ''}`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`${classes.btn}${props.className ? props.className : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
