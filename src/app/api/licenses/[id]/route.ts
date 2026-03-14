import { isAuthenticated } from '@/lib/security';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { License } from '@/lib/models';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, license_number, start_date, end_date, status } = body;

        await connectDB();
        await License.findByIdAndUpdate(id, { name, license_number, start_date, end_date, status });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating license:', error);
        return NextResponse.json({ error: 'Failed to update license' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!await isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
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
