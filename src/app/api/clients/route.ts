export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getClientLogos, addClientLogo } from '@/lib/clients';

export async function GET() {
    try {
        const logos = await getClientLogos();
        return NextResponse.json(logos);
    } catch (error) {
        console.error('API Error (Clients GET):', error);
        return NextResponse.json({ error: 'Failed to fetch client logos' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newLogo = await addClientLogo(data);
        if (newLogo) {
            return NextResponse.json(newLogo);
        }
        return NextResponse.json({ error: 'Failed to add client logo' }, { status: 500 });
    } catch (error) {
        console.error('API Error (Clients POST):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
