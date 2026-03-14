import { isAuthenticated } from '@/lib/security';
import { NextRequest, NextResponse } from 'next/server';
import { updateHighlight, deleteHighlight } from '@/lib/highlights';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id } = await params;
        const data = await req.json();
        const updated = await updateHighlight(id, data);
        if (updated) {
            return NextResponse.json(updated);
        }
        return NextResponse.json({ error: 'Highlight not found' }, { status: 404 });
    } catch (error) {
        console.error('API Error (Highlights PUT):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id } = await params;
        const success = await deleteHighlight(id);
        if (success) {
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'Highlight not found' }, { status: 404 });
    } catch (error) {
        console.error('API Error (Highlights DELETE):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
