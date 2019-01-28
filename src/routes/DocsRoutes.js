import express from 'express';
import passport from 'passport';
import config from '../config/config';
import Doc from '../models/Doc';
import log from '../services/Logging';

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, (req, res) => {
  log.info('GET client and docs');
  log.info(req.query);

  if (req.query === undefined || req.query.clientCode === '') {
    return res
      .status(400)
      .send({ result: 'Пустой код клиента запроса документов' });
  }

  Doc.find({ ClientCode: req.query.clientCode })
    .limit(parseInt(config.resultsCounts, 10))
    .sort({ DocDate: -1 })
    .exec((err, results) => {
      if (err) {
        const errorMessage = 'Error to query docs!';
        log.error(errorMessage);
        log.error(err);
        return res.status(400).send({ result: errorMessage });
      }
      return res.status(200).send({ result: results });
    });
});

export default router;
