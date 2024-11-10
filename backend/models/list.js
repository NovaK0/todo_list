const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
},

    body: {
    type: String,
    required: true,
},

user: [{
    type:mongoose.Types.ObjectId,
    ref:"User",
}],

completed: {
    type: Boolean,
    default: false,
},

});


module.exports = mongoose.model('List',listSchema);