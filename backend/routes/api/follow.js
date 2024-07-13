const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const { FollowRequest } = require('../../db/models');

// --------------------------------------------------------------------------------------//
//                                     Follow a User                                    //
// ------------------------------------------------------------------------------------//
router.post('/follow', async (req, res, next) => {
    const { senderId, receiverId } = req.body;
    try {
        const follow = await FollowRequest.create({ senderId, receiverId });
        return res.status(201).json(follow);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                                   Unfollow a User                                    //
// ------------------------------------------------------------------------------------//
router.delete('/unfollow', async (req, res, next) => {
    const { senderId, receiverId } = req.body;
    try {
        await FollowRequest.destroy({ where: { senderId, receiverId } });
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
