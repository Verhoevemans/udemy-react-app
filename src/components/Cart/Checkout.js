import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmptyValidator = (value) => value.trim() === '';
const lengthValidator = (value) => value.trim().length > 4;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  });
  const [formInputsTouched, setFormInputsTouched] = useState({
    name: false,
    street: false,
    postalCode: false,
    city: false
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const checkFormValidity = () => {
    setFormInputsValidity({
      name: !isEmptyValidator(nameInputRef.current.value),
      street: !isEmptyValidator(streetInputRef.current.value),
      postalCode: lengthValidator(postalCodeInputRef.current.value),
      city: !isEmptyValidator(cityInputRef.current.value)
    });
  };

  const onChangeHandler = (event) => {
    setFormInputsTouched((previousState) => {
      const newState = { ...previousState };
      newState[event.target.id] = true;
      return newState;
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setFormInputsTouched({
      name: true,
      street: true,
      postalCode: true,
      city: true
    });
    checkFormValidity();
    const formIsValid = formInputsValidity.name && formInputsValidity.street && formInputsValidity.postalCode && formInputsValidity.city;

    if (formIsValid) {
      props.onConfirm({
        name: nameInputRef.current.value,
        street: streetInputRef.current.value,
        postalCode: postalCodeInputRef.current.value,
        city: cityInputRef.current.value,
      });
    }
  };
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={`${classes.control} ${formInputsValidity.name || !formInputsTouched.name ? '' : classes.invalid}`}>
          <label htmlFor="name">Your name</label>
          <input type="text"
                 id="name"
                 ref={nameInputRef}
                 onChange={onChangeHandler}
                 onBlur={checkFormValidity} />
          {!formInputsValidity.name && formInputsTouched.name && <p><i>Please enter a valid name</i></p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.street || !formInputsTouched.street ? '' : classes.invalid}`}>
          <label htmlFor="street">Street</label>
          <input type="text"
                 id="street"
                 ref={streetInputRef}
                 onChange={onChangeHandler}
                 onBlur={checkFormValidity} />
          {!formInputsValidity.street && formInputsTouched.street && <p><i>Please enter a valid street</i></p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.postalCode || !formInputsTouched.postalCode ? '' : classes.invalid}`}>
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text"
                 id="postalCode"
                 ref={postalCodeInputRef}
                 onChange={onChangeHandler}
                 onBlur={checkFormValidity} />
          {!formInputsValidity.postalCode && formInputsTouched.postalCode && <p><i>Please enter a valid postal code</i></p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.city || !formInputsTouched.city ? '' : classes.invalid}`}>
          <label htmlFor="city">City</label>
          <input type="text"
                 id="city"
                 ref={cityInputRef}
                 onChange={onChangeHandler}
                 onBlur={checkFormValidity} />
          {!formInputsValidity.city && formInputsTouched.city && <p><i>Please enter a valid city</i></p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
