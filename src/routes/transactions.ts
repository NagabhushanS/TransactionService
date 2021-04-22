import express from 'express';
import Transaction from '../models/Transaction';
import { ExpressRequest, ExpressResponse } from '../models/Transaction/types';

const router = express.Router();

router.get('/ping', (req, res) => {
    res.send('Ping Transaction');
});

router.put('/transaction/:transaction_id', async (req: ExpressRequest, res: ExpressResponse) => {
    await Transaction.updateTransaction(req, Number(req.params.transaction_id));

    res.json({
        status: 'ok',
    });
});

router.get('/transaction/:transaction_id', async (req: ExpressRequest, res: ExpressResponse) => {
    const transaction = await Transaction.getTransaction(Number(req.params.transaction_id));

    res.json(transaction);
});

router.get('/types/:type', async (req: ExpressRequest, res: ExpressResponse) => {
    const transactions = await Transaction.getAllTransactionsOfType(req.params.type);

    res.json(transactions);
});

router.get('/sum/:transaction_id', async (req: ExpressRequest, res: ExpressResponse) => {
    const childTransactionSum = await Transaction.getAllChildTransactions(Number(req.params.transaction_id));

    res.json({
        sum: childTransactionSum,
    });
});

export default router;