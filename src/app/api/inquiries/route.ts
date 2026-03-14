import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Inquiry } from '@/lib/models';
import { sanitizeData, verifySessionWithStore, inquirySchema, validateInput, checkRateLimit } from '@/lib/security';

export async function GET(req: NextRequest) {
    // Require authentication for GET requests (admin only)
    const session = req.cookies.get('admin_session');
    const isValid = session?.value ? await verifySessionWithStore(session.value) : false;

    if (!isValid) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await connectDB();
        const rows = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(rows);
    } catch (error) {
        console.warn('DB unavailable for inquiries:', (error as Error).message);
        return NextResponse.json([]);
    }
}

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || req.headers.get('x-real-ip')
            || 'unknown';

        const rateCheck = checkRateLimit(ip);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await req.json();

        // ── Input Validation with Zod ──
        const validation = validateInput(inquirySchema, body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error }, { status: 400 });
        }

        // Additional sanitization after validation
        const sanitized = sanitizeData(validation.data, ['name', 'email', 'mobile', 'message', 'service', 'source']);

        if (!sanitized.name || !sanitized.mobile) {
            return NextResponse.json({ error: 'Name and Mobile are required' }, { status: 400 });
        }

        await connectDB();
        await Inquiry.create(sanitized);
        return NextResponse.json({ success: true, message: 'Inquiry stored successfully' });
    } catch (error) {
        console.error('Error storing inquiry:', error);
        return NextResponse.json({ error: 'Failed to store inquiry' }, { status: 500 });
    }
}
