const express = require('express')
const router = express.Router()
const articleController =   require('../controllers/article.controller');
// Retrieve all articles
router.get('/', articleController.findAll);
// Create a new article
router.post('/', articleController.create);
// Retrieve a single article with id
router.get('/:id', articleController.findById);
// Update a article with id
router.put('/:id', articleController.update);
// Delete a article with id
router.delete('/:id', articleController.delete);
module.exports = router