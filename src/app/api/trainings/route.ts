export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getTrainings, addTraining } from '@/lib/trainings';

export async function GET() {
    try {
        const trainings = await getTrainings();
        return NextResponse.json(trainings);
    } catch (error) {
        console.error('GET /api/trainings error:', error);
        return NextResponse.json({ error: 'Failed to fetch trainings' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newTraining = await addTraining(body);
        return NextResponse.json(newTraining, { status: 201 });
    } catch (error) {
        console.error('POST /api/trainings error:', error);
        return NextResponse.json({ error: 'Failed to create training' }, { status: 500 });
    }
}
