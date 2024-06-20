import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { fileName } = req.body;

        if (!fileName) {
            res.status(400).json({ error: 'Missing file name' });
            return;
        }

        const filePath = path.join('./public/uploads/666bbcd15372c8f0bbb854eb/', fileName);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file', err);
                res.status(500).json({ error: 'Error deleting file' });
                return;
            }
            res.status(200).json({ message: 'File deleted successfully' });
        });
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
