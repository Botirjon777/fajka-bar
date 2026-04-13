import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './lib/db.js';
import Category from './models/Category.js';
import Subcategory from './models/Subcategory.js';
import Product from './models/Product.js';


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const categories = await Category.find({}).sort({ order: 1 });
    const subcategories = await Subcategory.find({}).sort({ order: 1 });
    const products = await Product.find({}).sort({ order: 1 });

    const menu = categories.map(cat => {
      const catSubcategories = subcategories.filter(sub => sub.category.toString() === cat._id.toString());
      
      const subcategoryData = catSubcategories.map(sub => ({
        ...sub.toObject(),
        products: products.filter(p => p.subcategory?.toString() === sub._id.toString())
      }));

      const productsWithoutSubcategory = products.filter(p => 
        p.category.toString() === cat._id.toString() && !p.subcategory
      );

      return {
        ...cat.toObject(),
        subcategories: subcategoryData,
        products: productsWithoutSubcategory
      };
    });

    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
