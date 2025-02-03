import { Router } from 'express';
import * as itemController from '../controllers/itemController';

const router: Router = Router();

// CRUD Routes for items
router.post('/', itemController.createItem);    // Create an item
router.get('/', itemController.getAllItems);    // Get all items
router.get('/fake-items', itemController.fakeItems) // Get fake items from placeholderjson api
router.get('/:id', itemController.getItemById); // Get an item by ID
router.put('/:id', itemController.updateItem);  // Update an item by ID
router.delete('/:id', itemController.deleteItem); // Delete an item by ID

export default router;
