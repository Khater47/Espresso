'use strict';

// load packages
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// load routers
const rootRouter = require('./routers/rootRouter');
const noteRouter = require('./routers/noteRouter');
const npostRouter = require('./routers/npostRouter');
const spostRouter = require('./routers/spostRouter');
const timerRouter = require('./routers/timerRouter');
const trendRouter = require('./routers/trendRouter');
const userRouter = require('./routers/userRouter');

// Create express application
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

//setup and enable Cors
const corsOptions = {
	origin: 'http://localhost:3000', //local ip address here instead of localhost
	optionsSuccessStatus: 200,
	credentials: true
};
app.use(cors(corsOptions));

// enable morgan for logging
app.use(morgan('dev'));

// APIs
app.use('/api', rootRouter);
app.use('/api', npostRouter);
app.use('/api', trendRouter);
/*
app.use('/api', noteRouter);
app.use('/api', spostRouter);
app.use('/api', timerRouter);
*/
app.use('/api', userRouter);

// Activate server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

module.exports = app;
