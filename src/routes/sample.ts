import express from 'express';
import Transaction from '../models/Transaction';
import { ExpressRequest, ExpressResponse } from '../models/Transaction/types';

const router = express.Router();

router.get('/ping', (req, res) => {
    res.send('Ping Sample');
});


export default router;