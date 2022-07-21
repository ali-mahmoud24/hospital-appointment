import { useState } from 'react';

import Container from '../UI/Container';
import Input from '../UI/Input';
import LaodingSpinner from '../UI/LoadingSpinner';

import useInput from '../../hooks/use-input';

import validateHttpUrl from '../../utils/validateUrl';

import classes from './DoctorForm.module.css';

const DoctorForm = () => {
  // @TODO ===> Change experience from input 'text' to textarea

  const [isLoading, setIsLoading] = useState(false);

  const validateInput = value => value.trim() !== '';

  const {
    value: enteredImageUrl,
    isValid: enterdImageUrlIsValid,
    hasError: imageUrlInputHasError,
    inputChangeHandler: imageUrlChangeHandler,
    inputBlurHandler: imageUrlBlurHandler,
    resetInput: resetImageUrlInput,
  } = useInput(validateHttpUrl);

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: FirstNameInputHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    resetInput: resetfirstNameInput,
  } = useInput(validateInput);

  const {
    value: enteredSecondName,
    isValid: enteredSecondNameIsValid,
    hasError: secondNameInputHasError,
    inputChangeHandler: secondNameChangeHandler,
    inputBlurHandler: secondNameBlurHandler,
    resetInput: resetSecondNameInput,
  } = useInput(validateInput);

  const {
    value: enteredSpecialization,
    isValid: enteredSpecializationIsValid,
    hasError: specializationInputHasError,
    inputChangeHandler: specializationChangeHandler,
    inputBlurHandler: specializationBlurHandler,
    resetInput: resetSpecializationInput,
  } = useInput(validateInput);

  const {
    value: enteredExperience,
    isValid: enteredExperienceIsValid,
    hasError: experienceInputHasError,
    inputChangeHandler: experienceChangeHandler,
    inputBlurHandler: experienceBlurHandler,
    resetInput: resetExperienceInput,
  } = useInput(validateInput);

  // Form validity
  let formIsValid = false;

  if (
    enterdImageUrlIsValid &&
    enteredFirstNameIsValid &&
    enteredSecondNameIsValid &&
    enteredExperienceIsValid &&
    enteredSpecializationIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = event => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    setIsLoading(true);

    const doctorData = {
      name: `Dr ${enteredFirstName} ${enteredSecondName}`,
      speciality: enteredSpecialization,
    };
    console.log(doctorData);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container>
      <form onSubmit={submitHandler} className={classes.form}>
        <Input
          id="firstname"
          type="text"
          label="First Name"
          onChangeHandler={firstNameChangeHandler}
          onBlurHandler={firstNameBlurHandler}
          value={enteredFirstName}
          InputHasError={FirstNameInputHasError}
          errorMessage="Doctor's First name must not be empty."
        />

        <Input
          id="secondname"
          type="text"
          label="Second Name"
          onChangeHandler={secondNameChangeHandler}
          onBlurHandler={secondNameBlurHandler}
          value={enteredSecondName}
          InputHasError={secondNameInputHasError}
          errorMessage="Doctor's Second name must not be empty."
        />

        <Input
          id="specialization"
          label="Doctor's Specialization"
          type="text"
          onChangeHandler={specializationChangeHandler}
          onBlurHandler={specializationBlurHandler}
          value={enteredSpecialization}
          InputHasError={specializationInputHasError}
          errorMessage="Doctor's specialization must not be empty."
        />

        <Input
          id="experience"
          label="Doctor's Experience"
          type="text"
          value={enteredExperience}
          onChangeHandler={experienceChangeHandler}
          onBlurHandler={experienceBlurHandler}
          InputHasError={experienceInputHasError}
          errorMessage="Doctor's experience must not be empty."
        />

        <Input
          id="image"
          label="Doctor's image URL"
          type="text"
          onChangeHandler={imageUrlChangeHandler}
          onBlurHandler={imageUrlBlurHandler}
          value={enteredImageUrl}
          InputHasError={imageUrlInputHasError}
          errorMessage="Please enter a valid image url."
        />

        <div className={classes.actions}>
          <button disabled={isLoading}>
            {isLoading ? <LaodingSpinner /> : 'Add Doctor'}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default DoctorForm;
