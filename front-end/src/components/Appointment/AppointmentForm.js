import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../shared/store/ui-slice';

import Modal from '../../shared/components/UI/Modal';
import Card from '../../shared/components/UI/Card';

import DateTimePicker from 'react-datetime-picker';

import classes from './AppointmentForm.module.css';

const AppointmentForm = () => {
  const [time, setTime] = useState(new Date());

  const dispatch = useDispatch();

  const modalIsShown = useSelector(state => state.ui.modalIsShown);

  const onCloseHandler = () => {
    dispatch(uiActions.closeModal());
  };

  if (!modalIsShown) {
    return null;
  }
  const addAppointmetHandler = async event => {
    event.preventDefault();

    try {
      await fetch('http://localhost:8000/add-apointment', {
        method: 'POST',
        body: JSON.stringify({ time, userId: '', doctorId: '' }),
      });
    } catch (err) {}
  };

  return (
    <Modal>
      <Card className={classes.card}>
        <h2>Please choose appointment's date and time: </h2>
        <form onSubmit={addAppointmetHandler}>
          <div className="center">
            <DateTimePicker onChange={setTime} value={time} />
          </div>

          <div className={classes.actions}>
            <button
              inverse
              className={classes['button--alt']}
              onClick={onCloseHandler}
            >
              Close
            </button>
            <button type="submit" className={classes.button}>
              Book Appointment
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
};

export default AppointmentForm;
