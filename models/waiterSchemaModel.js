var mongoose = require('mongoose');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiterAvailability";

mongoose.connect(mongoURL, {
    useMongoClient: true
}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("we are connected");
    }
});

var waiterSchema = new mongoose.Schema({
    username: String,
    day : Object
});

const waiters = mongoose.model('waiters', waiterSchema)

module.exports = waiters;
