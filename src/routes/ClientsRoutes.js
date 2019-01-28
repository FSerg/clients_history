import express from 'express';
import passport from 'passport';
import config from '../config/config';
import Client from '../models/Client';
import log from '../services/Logging';

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

const hasNumber = checkString => {
  return /\d/.test(checkString);
};

const getSearchCondition = queryString => {
  if (hasNumber(queryString)) {
    return {
      Phone: { $regex: new RegExp(queryString.replace(/\s+/g, '\\s+'), 'gi') }
    };
  }
  return {
    FullName: { $regex: new RegExp(queryString.replace(/\s+/g, '\\s+'), 'gi') }
  };
};

router.get('/', requireAuth, (req, res) => {
  log.info('GET client and docs');
  log.info(req.query);

  if (req.query === undefined || req.query.queryString === '') {
    return res.status(400).send({ result: 'Пустая строка запроса' });
  }

  Client.find(getSearchCondition(req.query.queryString))
    .limit(parseInt(config.resultsCounts, 10))
    .sort({ FullName: 1 })
    .exec((err, results) => {
      if (err) {
        const errorMessage = 'Error to query clients!';
        log.error(errorMessage);
        log.error(err);
        return res.status(400).send({ result: errorMessage });
      }
      return res.status(200).send({ result: results });
    });
});

export default router;
