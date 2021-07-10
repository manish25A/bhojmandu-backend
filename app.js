const express = require('express');
const morgan = require('morgan');
const connectDB = require('./bin/database');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const createError = require('http-errors');

dotenv.config({
	path: './bin/config.env',
});

// Connect to mongoDB database
connectDB();
//static
const cartRoute = require('./routes/cartRoute');
// initialize out app variable with express
const app = express();
//for parsing  json
app.use(
	express.urlencoded({
		urlencoded: true,
		extended: false,
	})
);
app.use(express.json());
//secures the api
app.use(helmet());

// Load routes files
const customerRoute = require('./routes/customerRoute');
const productRoute = require('./routes/productRoute');
const vendorRoute = require('./routes/vendorRoute');

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
//image upload to azure blob storage


//logger
app.use(morgan('dev'));
//cors option for xss protection
// var corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

//using cors for react
// app.use(cors());

app.use(cors());

app.use('/customer/auth/', customerRoute);
app.use('/product', productRoute);
app.use('/vendor/auth/', vendorRoute);
app.use('/cart/', cartRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

module.exports = app;
