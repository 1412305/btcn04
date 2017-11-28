var History = require('../models/history.js');

exports.GetAllHistorys = function(req, res){
    History.find({}, function(err, histories){
        if (err)
            res.status(500);
        res.json(histories);
    });
};

exports.GetHistoryById = function(req, res){
    History.findById(req.params.id, function(err, history){
        if (err)
            res.status(500);
        res.json(history);
    });
};

exports.CreateHistory = function(req, res){
    var history = new History(req.body);
    History.save(function(err, history){
        if (err)
            res.status(500);
        res.status(200);
    });
};

exports.UpdateHistory = function(req, res){
    var history = new History(req.body);
    History.findByIdAndUpdate(req.params.id, history, {new: true}, function(err, history){
        if (err)
            res.status(500);
        res.status(200);
    });
};

exports.DeleteHistory = function(req, res){
    History.findByIdAndRemove(req.params.id, function(err, history){
        if (err)
            res.status(500);
        res.status(200);
    });
};