var mongoose = require('mongoose');


var HistorySchema = mongoose.Schema({
    fromId: String,
    toId: String,
    amount: Number
});

module.exports = mongoose.model('History', HistorySchema);