import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.resolve(process.cwd(), 'lib', 'data.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);
    res.status(200).json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
}
