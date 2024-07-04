const express = require('express')
const auth = require('../middleware/auth');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff')

router.post('/', auth, stuffCtrl.createThing);

router.put('/:id',auth, stuffCtrl.modifyingThing);

router.delete('/:id',auth, stuffCtrl.deleteThing);

router.get('/:id',auth, stuffCtrl.getOneThing);

  //router.use intercept all request
router.get('/', auth, stuffCtrl.getAllStuff);

module.exports = router;