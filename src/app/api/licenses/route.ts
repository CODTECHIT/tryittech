import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { License } from '@/lib/models';

export async function GET() {
    try {
        await connectDB();
        const rows = await License.find({}).sort({ end_date: 1 }).lean();
        return NextResponse.json(rows);
    } catch (error) {
        console.warn('DB unavailable for licenses:', (error as Error).message);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, license_number, start_date, end_date, status } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        await connectDB();
        const doc = await License.create({ name, license_number, start_date, end_date, status: status || 'Active' });
        return NextResponse.json({ id: doc._id, name, success: true });
    } catch (error) {
        console.error('Error adding license:', error);
        return NextResponse.json({ error: 'Failed to add license' }, { status: 500 });
    }
}
