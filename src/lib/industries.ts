import connectDB from './db';
import { Industry as IndustryModel } from './models';
import { sanitizeData } from './security';
import fs from 'fs';
import path from 'path';

export interface Industry {
    id: string;
    slug: string;
    name: string;
    category: string;
    image: string;
    secondaryImage: string;
    icon: string;
    info: string;
    overview: string;
    segments: { title: string; description: string }[];
    solutions: { title: string; description: string }[];
    insights: { title: string; category: string; image: string }[];
    edge: { title: string; description: string; icon: string }[];
    source?: 'db' | 'fallback';
}

const INDUSTRY_FIELDS: (keyof Industry)[] = ['slug', 'name', 'category', 'image', 'secondaryImage', 'icon', 'info', 'overview', 'segments', 'solutions', 'insights', 'edge'];

function toIndustry(doc: Record<string, unknown>, source: 'db' | 'fallback' = 'db'): Industry & { source: string } {
    return {
        id: String(doc._id || doc.id),
        slug: String(doc.slug || ''),
        name: String(doc.name || ''),
        category: String(doc.category || 'IT'),
        image: String(doc.image || ''),
        secondaryImage: String(doc.secondaryImage || ''),
        icon: String(doc.icon || ''),
        info: String(doc.info || ''),
        overview: String(doc.overview || ''),
        segments: Array.isArray(doc.segments) ? doc.segments as Industry['segments'] : [],
        solutions: Array.isArray(doc.solutions) ? doc.solutions as Industry['solutions'] : [],
        insights: Array.isArray(doc.insights) ? doc.insights as Industry['insights'] : [],
        edge: Array.isArray(doc.edge) ? doc.edge as Industry['edge'] : [],
        source: source
    } as Industry & { source: 'db' | 'fallback' };
}

function getFallbackIndustries(): Industry[] {
    try {
        const filePath = path.join(process.cwd(), 'src/data/industries.json');
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch {
        return [];
    }
}

export async function getIndustries(): Promise<Industry[]> {
    try {
        await connectDB();
        const docs = await IndustryModel.find({}).lean();
        const dbIndustries = (docs || []).map(d => toIndustry(d as Record<string, unknown>, 'db'));
        const fallback = getFallbackIndustries().map(f => toIndustry(f as unknown as Record<string, unknown>, 'fallback'));

        const merged = [...dbIndustries];
        fallback.forEach(fi => {
            if (!merged.some(m => m.slug === fi.slug)) {
                merged.push(fi);
            }
        });

        return merged;
    } catch (err) {
        console.warn('DB error for industries — using static fallback', err);
        return getFallbackIndustries().map(f => toIndustry(f as unknown as Record<string, unknown>, 'fallback'));
    }
}

export async function getIndustryBySlug(slug: string): Promise<Industry | undefined> {
    try {
        await connectDB();
        const doc = await IndustryModel.findOne({ slug }).lean();
        if (doc) return toIndustry(doc as Record<string, unknown>, 'db');
    } catch {
        console.warn('DB unavailable for industry slug — using fallback');
    }
    const fallback = getFallbackIndustries().find(i => i.slug === slug);
    return fallback ? toIndustry(fallback as unknown as Record<string, unknown>, 'fallback') : undefined;
}

export async function addIndustry(data: Omit<Industry, 'id'>): Promise<Industry | null> {
    try {
        await connectDB();
        const sanitized = sanitizeData(data as Record<string, unknown>, INDUSTRY_FIELDS as string[]);
        const doc = await IndustryModel.create(sanitized);
        return toIndustry(doc.toObject() as Record<string, unknown>, 'db');
    } catch (err) {
        console.error('Error adding industry:', err);
        return null;
    }
}

export async function updateIndustry(id: string, data: Partial<Industry>): Promise<Industry | null> {
    try {
        await connectDB();
        const sanitized = sanitizeData(data as Record<string, unknown>, INDUSTRY_FIELDS as string[]);
        let doc = null;

        // Only try findById if it looks like a valid MongoDB ID
        // (24 hex characters)
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

        if (isObjectId) {
            const updated = await IndustryModel.findByIdAndUpdate(id, sanitized, { new: true }).lean();
            if (updated) doc = updated;
        }

        // If not found by _id, it might be a fallback item being promoted to DB
        if (!doc && data.slug) {
            // Check if it exists in DB already by its unique slug
            const existing = await IndustryModel.findOne({ slug: data.slug }).lean();
            if (existing) {
                doc = await IndustryModel.findByIdAndUpdate(existing._id, sanitized, { new: true }).lean();
            } else {
                // Not in DB at all, create it now
                const created = await IndustryModel.create(sanitized);
                doc = created.toObject();
            }
        }

        if (doc) {
            return toIndustry(doc as Record<string, unknown>, 'db');
        }
        return null;
    } catch (err: unknown) {
        console.error('Error updating industry in DB:', err);
        throw err;
    }
}

export async function deleteIndustry(id: string): Promise<boolean> {
    try {
        await connectDB();
        const result = await IndustryModel.findByIdAndDelete(id);
        return !!result;
    } catch (err) {
        console.error('Error deleting industry:', err);
        return false;
    }
}
