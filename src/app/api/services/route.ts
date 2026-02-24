import { NextRequest, NextResponse } from 'next/server';
import { getServices, addService } from '@/lib/services';

export async function GET() {
    try {
        const services = await getServices();
        return NextResponse.json(services);
    } catch (error) {
        console.error('API Error (Services GET):', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newService = await addService(data);
        if (newService) {
            return NextResponse.json(newService);
        }
        return NextResponse.json({ error: 'Failed to add service' }, { status: 500 });
    } catch (error) {
        console.error('API Error (Services POST):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
