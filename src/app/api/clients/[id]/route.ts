import { NextRequest, NextResponse } from 'next/server';
import { updateClientLogo, deleteClientLogo } from '@/lib/clients';

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const data = await req.json();
        const updated = await updateClientLogo(id, data);
        if (updated) {
            return NextResponse.json(updated);
        }
        return NextResponse.json({ error: 'Failed to update client logo' }, { status: 500 });
    } catch (error) {
        console.error('API Error (Clients PUT):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const success = await deleteClientLogo(id);
        if (success) {
            return NextResponse.json({ message: 'Deleted successfully' });
        }
        return NextResponse.json({ error: 'Failed to delete client logo' }, { status: 500 });
    } catch (error) {
        console.error('API Error (Clients DELETE):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
