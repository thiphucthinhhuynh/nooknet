const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, FollowRequest } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
});

// --------------------------------------------------------------------------------------//
//                           Get Followers (Senders) of a User                          //
// ------------------------------------------------------------------------------------//
router.get('/:userId/followers', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const followers = await FollowRequest.findAll({
            where: { receiverId: userId },
            include: [{ model: User, as: 'Sender' }]
        });
        return res.status(200).json(followers);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                           Get Followees (Receivers) of a User                        //
// ------------------------------------------------------------------------------------//
router.get('/:userId/followees', async (req, res, next) => {
    const { userId } = req.params;
    try {
        const followees = await FollowRequest.findAll({
            where: { senderId: userId },
            include: [{ model: User, as: 'Receiver' }]
        });
        return res.status(200).json(followees);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
