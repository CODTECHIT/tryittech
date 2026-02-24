import { NextRequest, NextResponse } from 'next/server';
import { updateIndustry, deleteIndustry } from '@/lib/industries';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await req.json();
        const updated = await updateIndustry(id, data);
        if (updated) return NextResponse.json(updated);
        return NextResponse.json({ error: 'Industry not found or failed to update' }, { status: 404 });
    } catch (error) {
        console.error('API Error (Industries PUT):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const success = await deleteIndustry(id);
        if (success) return NextResponse.json({ message: 'Deleted' });
        return NextResponse.json({ error: 'Industry not found' }, { status: 404 });
    } catch (error) {
        console.error('API Error (Industries DELETE):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
