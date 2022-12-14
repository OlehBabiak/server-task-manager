const fs = require('fs');
const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const {authRouter, boardRouter, columnsRouter, taskRouter} = require("./src/routes");
const ENV = require("./src/common/env.enum");
const { config } = require ('dotenv');

config();


mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connection is successfull");
	})
	.catch(( e ) => {
		console.log("no connection ");
	});

const corsOptions ={
	origin: 'https://olehbabiak.github.io',
	// origin: 'http://localhost:4200',
	// origin: 'http://localhost:60922',
	credentials:true,            //access-control-allow-credentials:true
	optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter)
app.use('/api/board', boardRouter)
app.use('/api/columns', columnsRouter)
app.use('/api/tasks', taskRouter)

const start = async () => {
	try {
		if (!fs.existsSync('src')) {
			await fs.mkdirSync('src');
		}
		app.listen(process.env.PORT || 5000, () => {
			console.log('App listen 8060');
		});
	} catch (err) {
		console.error(`Error on server startup: ${ err.message }`);
	}
};

start()
