const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const { Like } = require('../../db/models');

// --------------------------------------------------------------------------------------//
//                                    Unlike an Item                                    //
// ------------------------------------------------------------------------------------//
router.delete('/:likeId', requireAuth, async (req, res, next) => {
    try {
        const { likeId } = req.params;

        const like = await Like.findByPk(likeId);

        if (!like) {
            return res.status(404).json({ message: "Like not found" });
        }

        // Check if the Like belongs to the current User
        if (like.userId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized. Like doesn't belong to the current user" });
        }

        await like.destroy();
        return res.status(200).json({ message: "Like removed" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
