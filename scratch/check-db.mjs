import dbConnect from './api/lib/db.js';
import Category from './api/models/Category.js';
import Product from './api/models/Product.js';

async function check() {
  try {
    console.log('Connecting...');
    await dbConnect();
    const catCount = await Category.countDocuments();
    const prodCount = await Product.countDocuments();
    console.log(`Success! Found ${catCount} categories and ${prodCount} products.`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

check();
