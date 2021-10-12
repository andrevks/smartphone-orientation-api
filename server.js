const express = require('express');
const cors = require('express')
const messageRouter = require('./routes/messageRoutes.js');
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8085;

app.use(messageRouter);

app.listen(port);
console.log("Server is running in port "+ port);
