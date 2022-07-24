import React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import LaodingSpinner from '../../shared/components/UI/LoadingSpinner';

import useForm from '../../shared/hooks/use-form';

import { specalizationOptions } from '../../shared/utils/specailzationList';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators';

import classes from './DoctorForm.module.css';

const UpdateDoctor = () => {
  const [loadedDoctor, setLoadedDoctor] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate();

  const navigate = useNavigate();
  const params = useParams();

  const { doctorId } = params;

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstname: {
        value: '',
        isValid: false,
      },
      secondname: {
        value: '',
        isValid: false,
      },
      specialization: {
        value: '',
        isValid: false,
      },
      experience: {
        value: '',
        isValid: false,
      },
      // image: {
      //   value: '',
      //   isValid: false,
      // },
    },
    false
  );

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/admin/doctors/${doctorId}`
        );
        const responseData = await response.json();
        console.log(responseData.doctor);

        // setLoadedDoctor(responseData.doctor);

        setFormData(
          {
            firstname: {
              value: responseData.doctor.firstname,
              isValid: true,
            },
            secondname: {
              value: responseData.doctor.secondname,
              isValid: true,
            },
            specialization: {
              value: responseData.doctor.specialization,
              isValid: true,
            },
            experience: {
              value: responseData.doctor.experience,
              isValid: true,
            },
            // imageUrl: {
            //   value: responseData.doctor.imageUrl,
            //   isValid: true,
            // },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoctor();
  }, [setFormData, doctorId]);

  const doctorUpdateSubmitHandler = async event => {
    event.preventDefault();

    try {
      await fetch(`http://localhost:8000/admin/doctors/${doctorId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          firstname: formState.inputs.firstname.value,
          secondname: formState.inputs.secondname.value,
          experience: formState.inputs.experience.value,
          specialization: formState.inputs.specialization.value,
          // imageUrl: formState.inputs.imageUrl.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/doctors', { replace: true });
    } catch (err) {}
  };

  return (
    <form onSubmit={doctorUpdateSubmitHandler} className={classes.form}>
      <Input
        id="firstname"
        element="input"
        type="text"
        label="First Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Doctor's First name must not be empty."
        onInput={inputHandler}
      />

      <Input
        id="secondname"
        element="input"
        type="text"
        label="Second Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Doctor's Second name must not be empty."
        onInput={inputHandler}
      />

      <Input
        id="specialization"
        element="select"
        label="Doctor's Specialization"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Doctor's specialization must not be empty."
        onInput={inputHandler}
        options={specalizationOptions}
      />

      <Input
        id="experience"
        element="textarea"
        label="Doctor's Experience"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorMessage="Please enter a valid experience (at least 5 characters)."
        onInput={inputHandler}
      />

      {/* <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image."
      /> */}

      <div className={classes.actions}>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LaodingSpinner /> : 'Update Doctor'}
        </Button>
      </div>
    </form>
  );
};

export default UpdateDoctor;
