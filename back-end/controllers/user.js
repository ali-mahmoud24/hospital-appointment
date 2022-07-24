const { validationResult } = require('express-validator');
const { HttpError } = require('../models/http-error');

const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});
    // console.log(doctors);
    res.json({
      doctors: doctors.map(doctor => doctor.toObject({ getters: true })),
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addAppointment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { time } = req.body;
  const { doctorId, userId } = req.params;

  const newAppointment = new Appointment({
    time,
    userId,
    doctorId,
  });

  try {
    await newAppointment.save();

    res.status(201).json({
      message: 'Appointment created!',
      appointmentId: newAppointment._id,
    });
  } catch (err) {
    console.log(err);
  }
};
