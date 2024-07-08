const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User, Item } = require('../../db/models');

// --------------------------------------------------------------------------------------//
//                Get results of searching for Item or User by their name               //
// ------------------------------------------------------------------------------------//
router.get('/', async (req, res, next) => {
    const { type, query } = req.query;

    try {
        let results;
        if (type === 'items') {
            results = await Item.findAll({
                where: {
                    name: {
                        [Op.like]: `%${query}%`
                    }
                }
            });
        } else if (type === 'users') {
            results = await User.findAll({
                where: {
                    username: {
                        [Op.like]: `%${query}%`
                    }
                }
            });
        }
        return res.json(results);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
