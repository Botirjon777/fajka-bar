import type { VercelResponse } from '@vercel/node';
import dbConnect from '../lib/db';
import Category from '../models/Category';
import Subcategory from '../models/Subcategory';
import Product from '../models/Product';
import { withAuth, AuthenticatedRequest } from '../lib/authMiddleware';

async function handler(req: AuthenticatedRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Anchor ID must be unique' });
      }
      return res.status(500).json({ message: 'Error creating category', error: error.message });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    try {
      const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
      if (!category) return res.status(404).json({ message: 'Category not found' });
      return res.status(200).json(category);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error updating category', error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) return res.status(404).json({ message: 'Category not found' });

      // Cascade delete: Remove subcategories and products associated with this category
      await Subcategory.deleteMany({ category: id });
      await Product.deleteMany({ category: id });

      return res.status(200).json({ message: 'Category and all associated items deleted' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
