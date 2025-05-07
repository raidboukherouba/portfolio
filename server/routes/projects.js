const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { validateProject } = require('../middlewares/validators/projectValidator');
const handleValidationErrors = require('../middlewares/handleValidationErrors');
// const protect = require('../middlewares/authMiddleware');

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', validateProject, handleValidationErrors, projectController.createProject);
router.put('/:id', validateProject, handleValidationErrors, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
