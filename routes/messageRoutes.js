const express = require('express');
const cors = require('cors');
const app = express();

var coord = {
 x: 0.0,
 y: 0.0,
 z: 0.0,
 title: "Sem orientacao"
}

app.use((req, res, next) => {

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
    console.log("Sending..."+ coord.title);
    const responseMsg = JSON.stringify(coord);
    res.send(responseMsg);
})

app.post('/accmeter',(req,res)=>{
        let msg = req.body
        let {x, y, z, title} = msg;
        coord = {
          x,
          y,
          z,
          title
        }
        console.log("Receving..."+ coord.title);
        const responseMsg = JSON.stringify(coord)
        res.send(responseMsg);
})


module.exports = app