const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const { Review, Store } = require('../../db/models');

// --------------------------------------------------------------------------------------//
//                  View the Reviews written by the Current User                        //
// ------------------------------------------------------------------------------------//
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: { userId: req.user.id },
            include: [{ model: Store }]
        });

        return res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                                   Update a Review                                    //
// ------------------------------------------------------------------------------------//
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;
    const { body, stars } = req.body;

    try {
        let review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if the Review belongs to the Current User
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized. You can only modify your own reviews." });
        }

        await review.update({ body, stars });
        return res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                                   Delete a Review                                    //
// ------------------------------------------------------------------------------------//
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { reviewId } = req.params;

    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if the Review belongs to the Current User
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized. You can only modify your own reviews." });
        }

        await review.destroy();
        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
