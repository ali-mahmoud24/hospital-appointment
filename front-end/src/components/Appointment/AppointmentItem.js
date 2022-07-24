import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UI/Card';

import Button from '../../shared/components/FormElements/Button';

import classes from './AppointmentItem.module.css';

const AppointmentItem = props => {
  const { doctorName, speciality, date, time } = props;

  const navigate = useNavigate();

  // const deleteDoctorHandler = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8000/admin/doctors/${props.id}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-type': 'application/json',
  //         },
  //       }
  //     );
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //     props.onDelete(props.id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const redirectToEdit = () => {
  //   navigate(`/doctors/${props.id}`);
  // };

  return (
    <li className={classes['list-item']}>
      <Card className={classes.card}>
        <h3>Dr. {doctorName}</h3>

        <h4>Speciality:</h4>

        <div className="center">
          <span>{speciality}</span>
        </div>

        <div className={`${classes.time}`}>
          <div>
            <h3>Date: </h3>
            <h4>{date}</h4>
          </div>
          <div>
            <h3>Time: </h3>
            <h4>{time}</h4>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default AppointmentItem;
