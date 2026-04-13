import type { VercelResponse } from '@vercel/node';
import dbConnect from '../lib/db.js';
import Subcategory from '../models/Subcategory.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { withAuth, AuthenticatedRequest } from '../lib/authMiddleware.js';

async function handler(req: AuthenticatedRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const subcategory = await Subcategory.create(req.body);
      return res.status(201).json(subcategory);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error creating subcategory', error: error.message });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    try {
      const subcategory = await Subcategory.findByIdAndUpdate(id, req.body, { new: true });
      if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
      return res.status(200).json(subcategory);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error updating subcategory', error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const subcategory = await Subcategory.findByIdAndDelete(id);
      if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });

      // Cascade delete: Remove products associated with this subcategory
      await Product.deleteMany({ subcategory: id });

      return res.status(200).json({ message: 'Subcategory and associated products deleted' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error deleting subcategory', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
