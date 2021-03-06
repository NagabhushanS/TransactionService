//node modules
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
//configs
import DBPool from './configs/database';
//routes
import transactionRouter from './routes/transactions';
//models
import Transaction from './models/Transaction';

//setup process env
dotenv.config();

const app = express();

//front-end
app.use(express.static('C:/Users/nagab/OneDrive/Desktop/WEB/learn-react/build'));

//logging
app.use(logger('dev'));

//cookie and json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//setup routes and apis
app.use('/transactionservice', transactionRouter);

//404
app.use(function (req, res, next) {
    next('404_ERROR_SERVER');
});

// error handler
app.use(function (err, req, res, next) {
    res.send("ERROR!");
});

//start the server on db connection
const dbURL = process.env.DB_URL;
const port = process.env.PORT;

DBPool.initDB(dbURL).then((db) => {
    app.listen(port, () => {
        console.log('Server listening on ' + port);
        Transaction.injectDB(db);
    });
}).catch(err => {
    console.log('DB Connection failure, hence server start failed!');
});