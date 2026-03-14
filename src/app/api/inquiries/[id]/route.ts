import { isAuthenticated } from '@/lib/security';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Inquiry } from '@/lib/models';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id } = await params;
        await connectDB();
        const deleted = await Inquiry.findByIdAndDelete(id);

        if (deleted) {
            return NextResponse.json({ message: 'Inquiry deleted successfully' });
        }
        return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    } catch (error) {
        console.error('API Error (Inquiries DELETE):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
