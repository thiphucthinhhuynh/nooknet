const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const { validateItem } = require('../../utils/validation');
const { Store, Item, ItemImage, User, Review } = require('../../db/models');

// --------------------------------------------------------------------------------------//
//                                   View all Stores                                    //
// ------------------------------------------------------------------------------------//
router.get('/', async (req, res, next) => {
    try {
        const stores = await Store.findAll({
            include: [{ model: User, as: 'Owner', attributes: ['profilePic', 'username'] }]
        });
        return res.status(200).json(stores);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                  View the Store owned by the Current User                            //
// ------------------------------------------------------------------------------------//
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    try {
        const store = await Store.findOne({
            where: { ownerId: userId },
            include: [{ model: User, as: 'Owner', attributes: ['profilePic'] }]
        });

        if (!store) {
            return res.status(200).json(null);
        }

        return res.status(200).json(store);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                       Get details of a Store from a Store id                         //
// ------------------------------------------------------------------------------------//
router.get('/:storeId', async (req, res, next) => {
    const { storeId } = req.params;

    try {
        const store = await Store.findByPk(storeId, {
            include: [{ model: User, as: 'Owner', attributes: ['id', 'profilePic', 'username'] }]
        });

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        return res.status(200).json(store);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                                     Create a Store                                   //
// ------------------------------------------------------------------------------------//
router.post('/', requireAuth, async (req, res, next) => {
    const { name, description, location } = req.body;
    const ownerId = req.user.id;

    try {
        const newStore = await Store.create({ ownerId, name, description, location });
        return res.status(201).json(newStore);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                                      Update a Store                                  //
// ------------------------------------------------------------------------------------//
router.put('/:storeId', requireAuth, async (req, res, next) => {
    const { storeId } = req.params;
    const { name, description, location } = req.body;

    try {
        let store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        // Check if the store belongs to the current user
        if (store.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized. Store doesn't belong to the current user" });
        }

        await store.update({ name, description, location });
        return res.status(200).json(store);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                                    Delete a Store                                    //
// ------------------------------------------------------------------------------------//
router.delete('/:storeId', requireAuth, async (req, res, next) => {
    const { storeId } = req.params;

    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        // Check if the store belongs to the current user
        if (store.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized. Store doesn't belong to the current user." });
        }

        await store.destroy();
        return res.status(200).json({ message: "Store deleted successfully." });
    } catch (error) {
        next(error);
    }
});

/*  ─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───  ‧₊˚❀༉‧₊˚.  ─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───  ‧₊˚❀༉‧₊˚.  ─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ─── */
// --------------------------------------------------------------------------------------//
//                            View all Items of a specific Store                        //
// ------------------------------------------------------------------------------------//
router.get('/:storeId/items', async (req, res, next) => {
    const { storeId } = req.params;

    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        const items = await Item.findAll({
            where: { storeId },
            include: [{ model: ItemImage }]
        });
        return res.status(200).json(items);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                              Create an Item for a Store                              //
// ------------------------------------------------------------------------------------//
router.post('/:storeId/items', requireAuth, validateItem, async (req, res, next) => {
    const { storeId } = req.params;
    const { name, description, price, quantity, category } = req.body;

    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        // Check if the store belongs to the current user
        if (store.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized. Store doesn't belong to the current user." });
        }

        const newItem = await Item.create({ storeId, name, description, price, quantity, category });
        return res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
});

/*  ─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───  ‧₊˚❀༉‧₊˚.  ─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ───  ‧₊˚❀༉‧₊˚.  ─── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ─── */
// --------------------------------------------------------------------------------------//
//                            View all Reviews of a specific Store                      //
// ------------------------------------------------------------------------------------//
router.get('/:storeId/reviews', async (req, res, next) => {
    const { storeId } = req.params;

    try {
        const reviews = await Review.findAll({
            where: { storeId },
            include: [
                { model: User, attributes: ['id', 'username', 'profilePic'] }
            ]
        });

        return res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                              Create an Review for a Store                             //
// ------------------------------------------------------------------------------------//
router.post('/:storeId/reviews', requireAuth, async (req, res, next) => {
    const { storeId } = req.params;
    const { userId, body, stars } = req.body;

    try {
        const newReview = await Review.create({ userId, storeId, body, stars });
        return res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
