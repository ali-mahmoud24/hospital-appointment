import { useState, useEffect } from 'react';

import AppointmentItem from './AppointmentItem';

import classes from './AppointmentList.module.css';

const AppointmentsList = () => {
  // const [loadedAppointments, setLoadedAppointments] = useState([]);

  // const appointmentDeletedHandler = deletedAppointmentId => {
  //   setLoadedAppointments(prevAppointments =>
  //     prevAppointments.filter(
  //       appointment => appointment.id !== deletedAppointmentId
  //     )
  //   );
  // };

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     const response = await fetch('http://localhost:8000/doctors');
  //     const data = await response.json();
  //     // console.log(data.doctors);
  //     setLoadedAppointments(data.doctors);
  //   };
  //   fetchDoctors();
  // }, []);

  // const appointmentsList = loadedAppointments.map(appointment => (
  //   <AppointmentItem
  //     key={appointment._id}
  //     id={appointment._id}
  //     name={`${doctor.firstname} ${doctor.secondname}`}
  //     speciality={doctor.specialization}
  //     experience={doctor.experience}
  //     onDelete={doctorDeletedHandler}
  //   />
  // ));

  // if (appointmentsList.length === 0) {
  //   return <h1>No Appointemnts found!</h1>;
  // }

  return (
    <ul className={classes.list}>
      <AppointmentItem
        doctorName="Jhon Doe"
        speciality="Surgery"
        date="12/8/2022"
        time="12:00 pm"
      />
      <AppointmentItem
        doctorName="Clara Jhones"
        speciality="Dermatolgy"
        date="12/8/2022"
        time="12:00 pm"
      />
      <AppointmentItem
        doctorName="Ahmed Mahmoud"
        speciality="Immunology"
        date="12/8/2022"
        time="12:00 pm"
      />
      <AppointmentItem
        doctorName="Ali Mahmoud"
        speciality="Surgery"
        date="12/8/2022"
        time="12:00 pm"
      />
    </ul>
  );
};

export default AppointmentsList;
