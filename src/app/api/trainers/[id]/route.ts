import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Trainer } from '@/lib/models';
import { sanitizeData } from '@/lib/security';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const sanitized = sanitizeData(body, ['name', 'mobile', 'email', 'expertise', 'details']);

        await connectDB();
        await Trainer.findByIdAndUpdate(id, sanitized);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating trainer:', error);
        return NextResponse.json({ error: 'Failed to update trainer' }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        await Trainer.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting trainer:', error);
        return NextResponse.json({ error: 'Failed to delete trainer' }, { status: 500 });
    }
}
