const express = require('express')
const router = express.Router()
const surveyController =   require('../controllers/survey.controller');
// Retrieve all surveys
router.get('/', surveyController.findAll);
// Create a new survey
router.post('/', surveyController.create);
// Retrieve a single survey with id
router.get('/:id', surveyController.findById);
// Update a survey with id
router.put('/:id', surveyController.update);
// Delete a survey with id
router.delete('/:id', surveyController.delete);
module.exports = router
