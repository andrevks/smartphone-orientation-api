const express = require('express');
const cors = require('cors');
// const messageModel = require('../models/message');
const app = express();
var statusMsg = 1;

var coord = {
 x: 0.0,
 y: 0.0,
 z: 0.0,
 title: ""
}

app.use(cors());
// add this below app.use("/", routes) to make index.html a static file
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

//getting information from the database
// app.get('/verifyData', (req, res) => {
//     //Searching inside the mongodb database
//     messageModel 
//         .findOne()//looking for the message
//         .sort({ idMensagem: -1 })
//         .then((msg) => {
//             statusMsg  = 0 
//             console.log("Status:",statusMsg);

//             res.json(msg);
//             console.log("OMNET++ made a request");
//         })
//         .catch(err => {
//           res.status(500).send(err)
//         })
// })

// app.get('/lookingStatus', (req,res)=>{
//     console.log("Panda verified the status");
//     console.log("Status:", statusMsg);
//     //console.log("res.json"+ res.json(status))
//     res.json(statusMsg);

// })

app.post('/accmeter',(req,res)=>{
        let msg = req.body
        console.log('before', msg)
       
        const {x, y, z, title} = msg;
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