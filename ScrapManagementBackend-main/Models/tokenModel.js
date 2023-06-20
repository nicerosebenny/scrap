var mongoose = require('mongoose');
var TokenSchema = mongoose.Schema({
    uid: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    tokenvalue: { type: String },
    status: { type: String, default: 'active' }, //loggedout
    socketid:{ type: String }
}, {
    //timestamps: true
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

module.exports = mongoose.model('TokenModel', TokenSchema);