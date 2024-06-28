const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js');
const { Store, Item } = require('../../db/models');

// --------------------------------------------------------------------------------------//
//                                   View all Stores                                    //
// ------------------------------------------------------------------------------------//
router.get('/', async (req, res, next) => {
    try {
        const stores = await Store.findAll();
        return res.status(200).json(stores);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                  View the Store owned by the Current User                            //
// ------------------------------------------------------------------------------------//
router.get('/current', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const store = await Store.findOne({ where: { ownerId: userId } });

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
    try {
        const { name, description, location } = req.body;
        const ownerId = req.user.id;

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
    try {
        const { storeId } = req.params;
        const { name, description, location } = req.body;

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
    try {
        const { storeId } = req.params;
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
    try {
        const { storeId } = req.params;
        const store = await Store.findByPk(storeId);

        if (!store) {
            const storeId = req.storeId;
            return res.status(404).json({ message: "Store not found." });
        }
        const items = await Item.findAll({ where: { storeId } });
        return res.status(200).json(items);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//                              Create an Item for a Store                              //
// ------------------------------------------------------------------------------------//
router.post('/:storeId/items', requireAuth, async (req, res, next) => {
    try {
        const { storeId } = req.params;
        const { name, description, category, price } = req.body;

        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found." });
        }

        // Check if the store belongs to the current user
        if (store.ownerId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized. Store doesn't belong to the current user." });
        }

        const newItem = await Item.create({ storeId, name, description, category, price });
        return res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
