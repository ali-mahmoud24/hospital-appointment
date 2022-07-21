import classes from './Input.module.css';

const Input = (props) => {
  const InputClasses = props.InputHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <div className={InputClasses}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
        value={props.value}
      />
      {props.InputHasError && <p>{props.errorMessage}</p>}
    </div>
  );
};

export default Input;
