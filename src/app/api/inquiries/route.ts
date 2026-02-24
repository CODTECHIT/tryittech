import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Inquiry } from '@/lib/models';
import { sanitizeData } from '@/lib/security';

export async function GET() {
    try {
        await connectDB();
        const rows = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(rows);
    } catch (error) {
        console.warn('DB unavailable for inquiries:', (error as Error).message);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sanitized = sanitizeData(body, ['name', 'email', 'mobile', 'message', 'service', 'source']);

        if (!sanitized.name || !sanitized.mobile) {
            return NextResponse.json({ error: 'Name and Mobile are required' }, { status: 400 });
        }

        await connectDB();
        await Inquiry.create(sanitized);
        return NextResponse.json({ success: true, message: 'Inquiry stored successfully' });
    } catch (error) {
        console.error('Error storing inquiry:', error);
        return NextResponse.json({ error: 'Failed to store inquiry' }, { status: 500 });
    }
}
