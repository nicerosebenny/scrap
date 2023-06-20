var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    role: {type: String, default: 'User' },//Buyer,User
    name:{ type:String }, //Name of the User
    phone: { type: String }, //PhoneNumber of the user. Must Be unique if User Name
    email: { type: String }, //Email of the user. Must Be unique if User Name
    place:{ type:String },
    district:{ type:String},
    town:{ type:String },
    street:{ type:String },
    buildingNo:{ type:String },
    houseNo:{ type:String },
    landmark:{ type:String },
    orgaisation:{ type:String },
    pincode:{ type:String },
    password: { type: String }, //password or otp based system if(otp)=>another model optModel Required.
    status: { type: String, default: 'Active' },// Active,Inactive,Pending,Deleted
    address: { type:String }, //Not a mandatory fileld
    entityCode:{type:String,default:"ENTITIY_1"},
}, { 
    //timestamps: true
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

var User = module.exports = mongoose.model('UserModel', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}