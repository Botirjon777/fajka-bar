import type { VercelResponse } from '@vercel/node';
import dbConnect from '../lib/db.js';
import Category from '../models/Category.js';
import Subcategory from '../models/Subcategory.js';
import Product from '../models/Product.js';
import { withAuth, AuthenticatedRequest } from '../lib/authMiddleware.js';


async function handler(req: AuthenticatedRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, items } = req.body; // type: 'category' | 'subcategory' | 'product', items: [{ id, order }]

  if (!type || !items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const Model = type === 'category' ? Category : type === 'subcategory' ? Subcategory : Product;
    
    // Bulk update approach: perform multiple updates
    const updates = items.map(item => 
      Model.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(updates);

    return res.status(200).json({ message: 'Reorder successful' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error reordering items', error: error.message });
  }
}

export default withAuth(handler);
