import { NextRequest, NextResponse } from 'next/server';
import { getIndustries, addIndustry } from '@/lib/industries';

export async function GET() {
    try {
        const industries = await getIndustries();
        return NextResponse.json(industries);
    } catch (error) {
        console.error('API Error (Industries GET):', error);
        return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newIndustry = await addIndustry(data);
        if (newIndustry) {
            return NextResponse.json(newIndustry);
        }
        return NextResponse.json({ error: 'Failed to add industry' }, { status: 500 });
    } catch (error) {
        console.error('API Error (Industries POST):', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
