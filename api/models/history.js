import { Timestamp } from '../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

var mongoose = require('mongoose');

var HistorySchema = mongoose.Schema({
    fromId: String,
    toId: String,
    time: Date,
    amount: Number
});

module.exports = mongoose.model('History', HistorySchema);