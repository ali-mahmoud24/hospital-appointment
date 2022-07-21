const path = require('path');

const express = require('express');

const mongoose = require('mongoose');

// const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://admin:admin@cluster0.amlqvbj.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();


const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');

app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
// app.use(shopRoutes);
// app.use(authRoutes);


// mongoose
//   .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(result => {
//     User.findOne().then(user => {
//       if (!user) {
//         const user = new User({
//           name: 'Ali',
//           email: 'ali@test.com',
//           cart: { items: [] },
//         });
//         user.save();
//       }
//     });
//     app.listen(3000, () => {
//       console.log('Listening on port 3000 !');
//     });
//   })
//   .catch(err => console.log(err));
