import { NextRequest, NextResponse } from 'next/server';
import { getHighlights, addHighlight } from '@/lib/highlights';

export async function GET() {
    try {
        const highlights = await getHighlights();
        return NextResponse.json(highlights);
    } catch (error) {
        console.error('API Error (Highlights GET):', error);
        return NextResponse.json({ error: 'Failed to fetch highlights' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newHighlight = await addHighlight(data);
        if (newHighlight) {
            return NextResponse.json(newHighlight);
        }
        return NextResponse.json({ error: 'Failed to add highlight' }, { status: 500 });
    } catch (error) {
        console.error('API Error (Highlights POST):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
