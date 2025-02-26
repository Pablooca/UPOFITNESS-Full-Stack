const asyncHandler = require('express-async-handler');

const Diets = require('../models/dietModel');

// @desc   Get all diets
// @route  GET /api/diets
// @access Public
const getDiets = asyncHandler(async (req, res) => {
    const diets = await Diets.find();

    res.status(200).json(diets);
})

// @desc   Get diet by ID
// @route  GET /api/diets/:id
// @access Public
const getDietById = asyncHandler(async (req, res) => {
    const diet = await Diets.findById({user_id: req.params.id});

    if(diet) {
        res.status(200).json(diet);
    } else {
        res.status(404);
        throw new Error('Diet not found');
    }
})

// @desc   Create a diet
// @route  POST /api/diets
// @access Private
const createDiet = asyncHandler(async (req, res) => {
    if( !req.body.user_id || !req.body.worker_id || !req.body.diet) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const goal = await Diets.create({
        user_id: req.body.user_id,
        worker_id: req.body.worker_id,
        diet: req.body.diet
    })

    res.status(201).json(goal);
})


module.exports = {
    getDiets,
    getDietById,
    createDiet,
}