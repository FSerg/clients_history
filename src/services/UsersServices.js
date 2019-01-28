// import jwt from 'jwt-simple';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import config from '../config/config';

import User from '../models/User';
import { LOADIPHLPAPI } from 'dns';

const roleAuthorization = roles => {
  return (req, res, next) => {
    const { user } = req;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ result: 'No user found!' });
        return next(err);
      }

      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }

      res
        .status(401)
        .json({ result: 'You are not authorized to view this content!' });
      return next('Unauthorized');
    });
  };
};

const getRoleByJwtData = async jwtData => {
  if (!jwtData._id) {
    return 'guest';
  }
  console.log('user ID: ' + jwtData._id);

  try {
    const foundUser = await User.findOne({ _id: jwtData._id, isActive: true });
    console.log('foundUser: ' + foundUser);

    return foundUser.role;
  } catch (error) {
    // handleError(res, error.message);
    return 'guest';
  }
};

const generateToken = user => {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: '30d'
  });
};

const setUserInfo = user => {
  return {
    _id: user._id,
    email: user.email,
    role: user.role
  };
};

const validate = data => {
  if (!isEmail(data.email)) {
    return 'Некорректный адрес эл.почты';
  }

  if (!data.email) {
    return 'Адрес эл.почты обязателен для заполнения';
  }

  if (!data.password) {
    return 'Пароль не может быть пустым';
  }

  return '';
};

module.exports = {
  roleAuthorization,
  getRoleByJwtData,
  validate,
  generateToken,
  setUserInfo
};
