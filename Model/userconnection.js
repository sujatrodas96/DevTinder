const mongoose = require("mongoose");

const ConnectionUserSchema = new mongoose.Schema({
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },
    status:{
        type:String,
        required : true,
        enum:{
            values: ["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }

},
{ timestamps : true });

ConnectionUserSchema.index({fromUserId : 1, toUserId : 1});

ConnectionUserSchema.pre("save", function (next) { 
    const connectionrequest = this;
    if(connectionrequest.fromUserId.equals(connectionrequest.toUserId)){
        throw new Error("Cannot send Connection Request To Yourself")
    }
    next();
})

const ConnectonRequestModel = mongoose.model("ConnectonRequest", ConnectionUserSchema);
module.exports = ConnectonRequestModel;