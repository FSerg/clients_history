import express from 'express';
import passport from 'passport';

import log from '../services/Logging';
import '../services/PassportServices';
import {
  roleAuthorization,
  validate,
  generateToken,
  setUserInfo
} from '../services/UsersServices';

import User from '../models/User';

const requireAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.post('/signup', (req, res) => {
  log.info('POST signup user:');
  log.info(req.body);

  let error = validate(req.body);
  if (error) {
    return res.status(400).send({ result: error });
  }
  const { email, password } = req.body;
  User.findOne({ email }, (errFind, existingUser) => {
    if (errFind) {
      log.error(errFind);
      return res.status(400).send({ result: errFind });
    }
    if (existingUser) {
      error = 'Адрес эл.почты уже используется';
      return res.status(400).send({ result: error });
    }

    const newUser = new User({ email, password });
    newUser.save(errSave => {
      if (errSave) {
        log.error(errSave);
        return res.status(400).send({ result: errSave });
      }

      const userInfo = setUserInfo(newUser);
      return res.json({
        result: {
          token: generateToken(userInfo),
          user: userInfo
        }
      });
    });
  });
});

// router.post('/login', requireSignin, (req, res) => {
//   console.log('POST user login:');
//   console.log(req.body);
//
//   // return res.json({ result: { token: tokenForUser(req.user) } });
//   const userInfo = setUserInfo(req.user);
//
//   return res.json({
//     result: {
//       token: generateToken(userInfo),
//       user: userInfo
//     }
//   });
// });

router.post('/login', (req, res, next) => {
  log.info('POST user login:');
  log.info(req.body);

  return passport.authenticate('local', (err, user) => {
    if (err) {
      if (err.name === 'IncorrectCredentials') {
        return res.status(400).json({ result: err.message });
      }
      return res.status(400).json({ result: 'Ошибка на сервере!' });
    }
    const userInfo = setUserInfo(user);
    return res.json({
      result: {
        token: generateToken(userInfo),
        user: userInfo
      }
    });
  })(req, res, next);
});

router.get('/all', requireAuth, roleAuthorization(['admin']), (req, res) => {
  log.info('GET all users');
  User.find()
    .select('-password')
    .exec((err, results) => {
      if (err) {
        const errorMessage = 'Error to query all users!';
        log.error(errorMessage);
        return res.status(400).send({ result: errorMessage });
      }
      return res.status(200).send({ result: results });
    });
});

router.get('/current', requireAuth, (req, res) => {
  log.info('GET current user');
  const { user } = req;
  const userInfo = setUserInfo(user);
  return res.status(200).send({ result: userInfo });
});

router.delete('/', requireAuth, roleAuthorization(['admin']), (req, res) => {
  log.info('DELETE one user');
  log.info(req.query);

  if (req.query === undefined) {
    const errMsg = 'В запросе отсутствует идентификатор пользователя';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }

  if (!req.query.userId) {
    const errMsg = 'В параметре запроса не заполнен идентификатор пользователя';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }

  User.findByIdAndRemove(req.query.userId, err => {
    if (err) {
      const errMsg = 'Ошибка при вудалении пользователя из БД';
      log.error(errMsg);
      log.error(err);
      return res.status(400).send({ result: errMsg });
    }
    return res.status(200).send({ result: 'success' });
  });
});

router.post('/', requireAuth, roleAuthorization(['admin']), (req, res) => {
  log.info('POST one user');
  log.info(req.body);

  const userData = req.body;

  User.findOne({ _id: userData._id }, (err, user) => {
    if (err) {
      const errMsg = 'Не удалось найти пользователя в БД';
      log.error(errMsg);
      log.error(err);
      return res.status(400).send({ result: errMsg });
    }

    for (let index in userData) {
      user[index] = userData[index];
    }

    user.save(err => {
      if (err) {
        const errMsg = 'Ошибка при записи данных о пользователе в БД';
        log.error(errMsg);
        log.error(err);
        return res.status(400).send({ result: errMsg });
      }
      return res.status(200).send({ result: 'success' });
    });
  });
});

export default router;
