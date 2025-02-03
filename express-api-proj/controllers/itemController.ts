import { Request, Response } from 'express';
import { Item } from '../models/item';
import { TodoItem } from '../models/todoItem';
import axios from 'axios'

const JSON_PLACEHOLDER_API = 'https://jsonplaceholder.typicode.com/todos/'
let items: Item[] = [];  // In-memory storage for items

// Create an item
export const createItem = (req: Request, res: Response): void => {
  const { title, content } = req.body;
  const newItem: Item = { id: items.length + 1, title, content };
  items.push(newItem);
  res.status(201).json(newItem);
};

// Get all items
export const getAllItems = (req: Request, res: Response): void => {
  res.json(items);
};


// Fetch fake items from an external API
export const fakeItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(JSON_PLACEHOLDER_API);
    const fakeItems = response.data.slice(0, 5).map((todo: TodoItem) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }));
    res.json(fakeItems)
  } catch (err: any) {
    res.status(500).send(`Unable to fetch fake items: ${err.message || err.response?.message}`);
  }
}

// Get a single item by ID
export const getItemById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const item = items.find(i => i.id === parseInt(id));
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    res.json(item);
  }
};

// Update an item by ID
export const updateItem = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { title, content } = req.body;
  const itemIndex = items.findIndex(i => i.id === parseInt(id));

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items[itemIndex] = { ...items[itemIndex], title, content };
    res.json(items[itemIndex]);
  }
};

// Delete an item by ID
export const deleteItem = (req: Request, res: Response): void => {
  const { id } = req.params;
  const itemIndex = items.findIndex(i => i.id === parseInt(id));

  if (itemIndex === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items.splice(itemIndex, 1);
    res.status(204).send();
  }
};
