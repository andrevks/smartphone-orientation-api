const express = require('express');
const cors = require('cors');
// const messageModel = require('../models/message');
const app = express();
var statusMsg = 1;

var coord = {
 x: 0.0,
 y: 0.0,
 z: 0.0,
 title: "Null acc values"
}

app.use((req, res, next) => {
    // res.append('Access-Control-Allow-Origin', ['*']);
    // res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.append('Access-Control-Allow-Headers', 'Content-Type');

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Content-type', 'application/json');
    res.header('Transfer-Enconding','chunked');
    res.header('access-control-allow-credentials','true');
    res.append('Vary','Origin, Accept-Encoding');


  next();
});


app.use(cors());
// add this below app.use("/", routes) to make index.html a static file
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

// getting information from the database
app.get('/accmeter', (req, res) => {  
    console.log(coord);
    const responseMsg = JSON.stringify(coord);
    console.log("Sending..."+ responseMsg);
    res.send(responseMsg);
})

app.post('/accmeter',(req,res)=>{
        let msg = req.body
        console.log('before', msg)
       
        let {x, y, z, title} = msg;


        coord = {
          x,
          y,
          z,
          title
        }

        console.log(coord);

        // msg = JSON.stringify(req.body);
        // console.log("Receving..."+ msg);
        const responseMsg = JSON.stringify(coord)
        // const responseMsg = coord
        console.log("Receving..."+ responseMsg);
        res.send(responseMsg);
        // statusMsg = 1;
        // .catch(err => {
        //   res.status(500).send(err)
        // })
})


// app.post('/setMensagem', (req, res) => {//I'm sending
//     let msg = new messageModel(req.body);
//     msg
//         .save()
//         .then((saved) => {
//             console.log("saving data" + saved);
//             console.log("Receving..."+ req.body.textoMensagem.Object);
//             res.send(saved);
//         })
//         .catch(err => {
//           res.status(500).send(err)
//         })
// })

module.exports = app