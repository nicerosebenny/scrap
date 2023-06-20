var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    tid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tokenModel"
    },
    category:{
        type:String
    },
    
   
    quantity:{
        type:Number
    },
    description:{
        type:String
    }
    
}, { 
    //timestamps: true
    timestamps: { createdAt: 'create_date', updatedAt: 'update_date' }
});

module.exports = mongoose.model('itemModel', itemSchema);
