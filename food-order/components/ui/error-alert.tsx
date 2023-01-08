import classes from './error-alert.module.css';

const ErrorAlert: React.FC<{ children: any }> = (props) => {
  return <div className={classes.alert}>{props.children}</div>;
};

export default ErrorAlert;
