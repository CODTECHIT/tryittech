import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Trainer } from '@/lib/models';
import { sanitizeData } from '@/lib/security';

export async function GET() {
    try {
        await connectDB();
        const rows = await Trainer.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(rows);
    } catch (error) {
        console.warn('DB unavailable for trainers:', (error as Error).message);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sanitized = sanitizeData(body, ['name', 'mobile', 'email', 'expertise', 'details']);

        if (!sanitized.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        await connectDB();
        const doc = await Trainer.create(sanitized);
        return NextResponse.json({ id: doc._id, name: doc.name, success: true });
    } catch (error) {
        console.error('Error adding trainer:', error);
        return NextResponse.json({ error: 'Failed to add trainer' }, { status: 500 });
    }
}
