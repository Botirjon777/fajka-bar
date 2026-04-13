import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Import the serverless functions
// Note: In a real Vercel environment, these are handled by the platform.
// Here we bridge them to a local Express server.
import loginHandler from './api/auth/login.ts';
import menuHandler from './api/menu.ts';
import categoriesHandler from './api/admin/categories.ts';
import subcategoriesHandler from './api/admin/subcategories.ts';
import productsHandler from './api/admin/products.ts';
import imagesHandler from './api/admin/images.ts';
import reorderHandler from './api/admin/reorder.ts';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Proxy-like bridge to serverless functions
app.post('/api/auth/login', async (req, res) => {
  try {
    // Vercel handlers expect (req, res) but they are VercelRequest/Response
    // For local dev, we can pass standard Express req/res
    await loginHandler(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/menu', async (req, res) => {
  try {
    await menuHandler(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin CRUD Routes
const adminRoutes = [
  { path: '/api/admin/categories', handler: categoriesHandler },
  { path: '/api/admin/subcategories', handler: subcategoriesHandler },
  { path: '/api/admin/products', handler: productsHandler },
  { path: '/api/admin/images', handler: imagesHandler },
  { path: '/api/admin/reorder', handler: reorderHandler },
];

adminRoutes.forEach(({ path, handler }) => {
  const wrapper = async (req, res) => {
    try {
      // Merge query and params if needed, but VercelRequest mixes them
      // In Express req.query might be a read-only getter, so we redefine it
      const mergedQuery = { ...req.query, ...req.params };
      Object.defineProperty(req, 'query', {
        value: mergedQuery,
        writable: true,
        configurable: true
      });
      await handler(req, res);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  app.post(path, wrapper);
  app.put(`${path}/:id`, wrapper);
  app.delete(`${path}/:id`, wrapper);
  if (path === '/api/admin/images') {
    app.get(path, wrapper);
  }
});




app.listen(port, '127.0.0.1', () => {
  console.log(`📡 API Server running at http://127.0.0.1:${port}`);
});

