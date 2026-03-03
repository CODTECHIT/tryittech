import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/security';

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

export async function POST(req: NextRequest) {
    // ── Auth Guard ──
    const session = req.cookies.get('admin_session');
    const isValid = session?.value ? await verifySession(session.value) : false;
    if (!isValid) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }

        if (file.size > MAX_SIZE_BYTES) {
            return NextResponse.json({ error: 'File size must not exceed 2 MB' }, { status: 400 });
        }

        // Convert to base64 data URI for storage
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataUri = `data:application/pdf;base64,${base64}`;

        return NextResponse.json({ dataUri, fileName: file.name, size: file.size });
    } catch (error) {
        console.error('PDF upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
