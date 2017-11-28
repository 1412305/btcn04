var Wallet = require('../models/wallet.js');

exports.GetAllWallets = function(req, res){
    Wallet.find({}, function(err, wallet){
        if (err)
            res.status(500);
        res.json(wallets);
    });
};

exports.GetWalletById = function(req, res){
    Wallet.findById(req.params.id, function(err, wallet){
        if (err)
            res.status(500);
        res.json(wallet);
    });
};

exports.CreateWallet = function(req, res){
    var wallet = new Wallet(req.body);
    wallet.save(function(err, wallet){
        if (err)
            res.status(500);
        res.status(200);
    });
};

exports.UpdateWallet = function(req, res){
    var wallet = new Wallet(req.body);
    Wallet.findByIdAndUpdate(req.params.id, wallet, {new: true}, function(err, wallet){
        if (err)
            res.status(500);
        res.status(200);
    });
};

exports.DeleteWallet = function(req, res){
    Wallet.findByIdAndRemove(req.params.id, function(err, wallet){
        if (err)
            res.status(500);
        res.status(200);
    });
};