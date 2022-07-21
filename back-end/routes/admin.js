const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/add-doctor', adminController.postAddDoctor);

// router.get('/doctors', adminController.getDoctors);

// router.get('/appointments', adminController.getAppointments);

// router.get('/edit-doctor/:productId', adminController.getEditProduct);

// router.post('/edit-doctor', adminController.postEditProduct);

// router.post('/delete-doctor', adminController.PostDeleteDoctor);

module.exports = router;
