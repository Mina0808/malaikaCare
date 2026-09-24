"use server"
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  const formData = await request.formData();
  console.log("formdata file uploading", formData)
  const file = formData.get('file') as File;
  console.log(" file uploading",file)

  if (file !== null && file !== undefined) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const filePath = path.join(process.cwd(), 'public/file', file.name);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully' });
  }

  return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
}
