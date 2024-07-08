const express = require('express');
const router = express.Router();
const { User, Item } = require('../../db/models');

router.get('/', async (req, res, next) => {
    const { type, query } = req.query;

    try {
        let results;
        if (type === 'items') {
            results = await Item.findAll({ where: { name: { $like: `%${query}%` } } });
        } else if (type === 'users') {
            results = await User.findAll({ where: { name: { $like: `%${query}%` } } });
        }
        res.json(results);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
