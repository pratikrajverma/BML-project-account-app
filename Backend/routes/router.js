const express = require('express');
const { createProfile, getProfile, updataProfile, deleteProfile } = require('../controllers/Profile');
const router = express.Router();



router.post('/createProfile',createProfile);

router.get('/getProfile',getProfile)

router.put('/updateProfile/:profileId',updataProfile);

router.delete('/deleteProfile/:profileId',deleteProfile);

module.exports = router;