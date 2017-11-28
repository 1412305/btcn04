var mongoose = require('mongoose');

var WalletSchema = mongoose.Schema({
    accountId: String,
    money: {type: Number, default: 1000}
});

module.exports = mongoose.model('Wallet', WalletSchema);