import type { VercelResponse } from '@vercel/node';
import dbConnect from '../lib/db';
import Product from '../models/Product';
import { withAuth, AuthenticatedRequest } from '../lib/authMiddleware';

async function handler(req: AuthenticatedRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error creating product', error: error.message });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json({ message: 'Product deleted' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
