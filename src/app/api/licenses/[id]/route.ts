import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { License } from '@/lib/models';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, license_number, start_date, end_date, status } = body;

        await connectDB();
        await License.findByIdAndUpdate(id, { name, license_number, start_date, end_date, status });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating license:', error);
        return NextResponse.json({ error: 'Failed to update license' }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();
        await License.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting license:', error);
        return NextResponse.json({ error: 'Failed to delete license' }, { status: 500 });
    }
}
