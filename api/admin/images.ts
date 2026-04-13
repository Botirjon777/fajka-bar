import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // In local dev, public is in the root
    // In Vercel, it varies, but for this project we'll target the relative 'public/images'
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    if (!fs.existsSync(imagesDir)) {
      return res.status(200).json([]);
    }

    const files = fs.readdirSync(imagesDir);
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const images = files.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    res.status(200).json(images);
  } catch (error) {
    console.error('Error reading images directory:', error);
    res.status(500).json({ message: 'Failed to list images' });
  }
}
