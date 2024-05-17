const express = require('express')
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')

router.post('/', stuffCtrl.createThing);

router.put('/:id', stuffCtrl.modifyingThing);

router.delete('/:id', stuffCtrl.deleteThing);

router.get('/:id', stuffCtrl.getOneThing);

  //router.use intercept all request
router.get('/', stuffCtrl.getAllStuff);

module.exports = router;