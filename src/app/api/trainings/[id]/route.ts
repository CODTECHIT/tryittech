import { NextRequest, NextResponse } from 'next/server';
import { updateTraining, deleteTraining } from '@/lib/trainings';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const updated = await updateTraining(id, body);
        if (!updated) {
            return NextResponse.json({ error: 'Training not found' }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        console.error('PUT /api/trainings/[id] error:', error);
        return NextResponse.json({ error: 'Failed to update training' }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const success = await deleteTraining(id);
        if (!success) {
            return NextResponse.json({ error: 'Training not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/trainings/[id] error:', error);
        return NextResponse.json({ error: 'Failed to delete training' }, { status: 500 });
    }
}
