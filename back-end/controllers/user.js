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
  
};
