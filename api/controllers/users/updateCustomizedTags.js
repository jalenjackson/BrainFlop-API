const mongoose = require('mongoose');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
let userObject;

exports.updateCustomizedTags = (req, res) => {
  User.findOneAndUpdate(
    { email: req.userData.email },
    { $set: { customizedTags: req.body.tags } },
    (err, documents) => {
      userObject = documents;
      if (err) throw err;
    },
  )
    .exec()
    .then(() => {
      const token = jwt.sign(
        {
          email: userObject.email,
          userId: userObject._id,
          name: userObject.name,
          customizedTags: userObject.customizedTags,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '2w',
        },
      );
      res.status(200).json({
        token
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        err,
      });
    });
};
