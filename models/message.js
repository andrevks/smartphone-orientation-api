const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    idMensagem: String,
    textoMensagem: Object
});

// var Mensagem = mongoose.model('Mensagem', messageSchema);
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
