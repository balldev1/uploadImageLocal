import { writeFile, mkdir, unlink } from 'fs/promises'; // Import unlink for file deletion
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = './public/upload/666bbcd15372c8f0bbb854eb/`';
        const path = `${uploadDir}${file.name}`;


        // Write the file to the defined path
        await writeFile(path, buffer);

        console.log(`Uploaded file: ${path}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ success: false, error: 'File upload failed' });
    }
}

