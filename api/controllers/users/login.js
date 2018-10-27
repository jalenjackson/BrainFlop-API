const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      console.log(user)
      if (!user) {
        return res.status(401).json({
          message: 'Authorization failed',
        });
      }
      return bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Authorization failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
              name: user.name,
              customizedTags: user.customizedTags
            },
            process.env.JWT_KEY,
            {
              expiresIn: '2w',
            },
          );
          return res.status(200).json({
            token,
            email: user.email,
            customizedTags: user.customizedTags,
            name: user.name,
            userId: user._id
          });
        }
        return res.status(401).json({
          message: 'Authorization failed',
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
