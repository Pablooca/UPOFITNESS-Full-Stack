const asyncHandler = require('express-async-handler');

const Diets = require('../models/dietModel');

// @desc   Get all diets
// @route  GET /api/diets
// @access Public
const getDiets = asyncHandler(async (req, res) => {
    const diets = await Diets.find();
    res.status(200).json(diets);
})

// @desc   Get diet by user ID
// @route  GET /api/diets/user/:id
// @access Public
const getDietByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    const diet = await Diets.find({user_id: userId});

    if(diet) {
        res.status(200).json(diet);
    } else {
        res.status(404);
        throw new Error('Diet not found');
    }
});

// @desc Get diet by worker ID
// @route GET /api/diets/worker/:id
// @access Public
const getDietByWorkerId = asyncHandler(async (req, res) => {
    const workerId = req.worker.dni;
    console.log(workerId);
    const diet = await Diets.findOne({worker_id: workerId});

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
    const { user_id, worker_id, meals } = req.body;

    if (!user_id || !worker_id || !meals || !Array.isArray(meals)) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const newDiet = await Diets.create({
        user_id,
        worker_id,
        meals
    });

    res.status(201).json(newDiet);

});


module.exports = {
    getDiets,
    getDietByUserId,
    getDietByWorkerId,
    createDiet,
}