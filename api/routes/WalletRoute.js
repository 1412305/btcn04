var express = require('express');
var router = express.Router();
var walletController = require('../controllers/WalletController.js');

router.route('/')
    .get(walletController.GetAllWallets)
    .post(walletController.CreateWallet);

router.get('/:id')
    .get(walletController.GetWalletById)
    .put(walletController.UpdateWallet)
    .delete(walletController.DeleteWallet);

module.exports = router;