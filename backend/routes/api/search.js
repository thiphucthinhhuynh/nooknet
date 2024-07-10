const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { User, Item, sequelize } = require('../../db/models');

// --------------------------------------------------------------------------------------//
//      Get results of searching for Item or User by their name (for PostgreSQL)        //
// ------------------------------------------------------------------------------------//
router.get('/', async (req, res, next) => {
    const { type, query } = req.query;

    try {
        let results;

        if (type === 'items') {
            results = await Item.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${query}%`
                    }
                }
            });
        } else if (type === 'users') {
            results = await User.findAll({
                where: {
                    username: {
                        [Op.iLike]: `%${query}%`
                    }
                }
            });
        }

        return res.json(results);
    } catch (error) {
        next(error);
    }
});

// --------------------------------------------------------------------------------------//
//         Get results of searching for Item or User by their name (for SQLite)         //
// ------------------------------------------------------------------------------------//
// router.get('/', async (req, res, next) => {
//     const { type, query } = req.query;

//     try {
//         let results;

//         if (type === 'items') {
//             results = await Item.findAll({
//                 where: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), {
//                     [Op.like]: `%${query.toLowerCase()}%`
//                 })
//             });
//         } else if (type === 'users') {
//             results = await User.findAll({
//                 where: sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), {
//                     [Op.like]: `%${query.toLowerCase()}%`
//                 })
//             });
//         }
//         return res.json(results);
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;
