const { validationResult } = require('express-validator');
const { HttpError } = require('../models/http-error');

const Doctor = require('../models/doctor');

exports.getDoctor = async (req, res, next) => {
  const { doctorId } = req.params;

  let doctor;
  try {
    doctor = await Doctor.findById(doctorId);
    res.json({ doctor: doctor.toObject({ getters: true }) });
  } catch (err) {
    console.log(err);
  }
};

exports.addDoctor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { firstname, secondname, specialization, experience } = req.body;

  const newDoctor = new Doctor({
    firstname,
    secondname,
    image: req.file.path,
    specialization,
    experience,
  });

  try {
    await newDoctor.save();

    res.status(201).json({ message: 'User created!', doctorId: newDoctor._id });
  } catch (err) {
    console.log(err);
  }
};

exports.updateDoctor = async (req, res, next) => {
  const { firstname, secondname, specialization, experience, imageUrl } =
    req.body;
  const { doctorId } = req.params;

  let doctor;

  try {
    doctor = await Doctor.findByIdAndDelete({ _id: doctorId });
  } catch (err) {
    console.log(err);
  }

  doctor.firstname = firstname;
  doctor.secondname = secondname;
  doctor.specialization = specialization;
  doctor.experience = experience;
  doctor.imageUrl = imageUrl;

  try {
    await doctor.save();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ doctor: doctor.toObject({ getters: true }) });
};

exports.deleteDoctor = async (req, res, next) => {
  const { doctorId } = req.params;

  let doctor;
  try {
    doctor = await Doctor.findByIdAndDelete({ _id: doctorId });
    res.status(200).json({ message: 'Deleted a doctor.' });
  } catch (err) {
    console.log(err);
  }
};
