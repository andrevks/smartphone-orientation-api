const express = require('express');
const cors = require('express')
const messageRouter = require('./routes/messageRoutes.js');
const app = express();
app.use(cors());
app.use(express.json());

    
// mongoose.connect(
//   db,
//   {
//     useNewUrlParser: true, 
//     useUnifiedTopology:true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     server: { 
//       socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } 
//     }, 
//     replset: {
//       socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } 
//     }

//   },
//   function (err) {
//     if (err) return console.log("Error: ", err);
//     console.log(
//       "MongoDB Connection -- Ready state is:",
//       mongoose.connection.readyState
//     );
//   }
//   );

const port = process.env.PORT || 8084;

app.use(messageRouter);

app.listen(port);
console.log("Server is running in port "+ port);
