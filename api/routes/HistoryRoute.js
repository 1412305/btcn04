var express = require('express');
var router = express.Router();
var historyController = require('../controllers/HistoryController.js');

router.route('/')
    .get(historyController.GetAllHistorys)
    .post(historyController.CreateHistory);

router.get('/:id')
    .get(historyController.GetHistoryById)
    .put(historyController.UpdateHistory)
    .delete(historyController.DeleteHistory);

module.exports = router;