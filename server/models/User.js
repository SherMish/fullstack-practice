const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    // hash: {
    //     type: String,
    //     require: true
    // },
    // salt: {
    //     type: String,
    //     require: true
    // },

    email: {
        type: String,
        require: true
    },

    password: {
        type:String,
        require:true
    }

});

module.exports = mongoose.model('User', UserSchema);