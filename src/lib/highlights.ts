import connectDB from './db';
import { Highlight as HighlightModel } from './models';
import { sanitizeData } from './security';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const HIGHLIGHT_FIELDS: (keyof Highlight)[] = ['title', 'icon', 'desc'];

export interface Highlight {
    id: string;
    title: string;
    icon: string;
    desc: string;
}

function toHighlight(doc: Record<string, unknown>): Highlight {
    return {
        id: String(doc._id || doc.id),
        title: String(doc.title || ''),
        icon: String(doc.icon || 'Target'),
        desc: String(doc.desc || ''),
    };
}

function getFallbackHighlights(): Highlight[] {
    try {
        const filePath = path.join(process.cwd(), 'src/data/highlights.json');
        if (!fs.existsSync(filePath)) return [];
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch {
        return [];
    }
}

export async function getHighlights(): Promise<Highlight[]> {
    try {
        await connectDB();
        const docs = await HighlightModel.find({}).lean();
        const dbHighlights = (docs || []).map(d => toHighlight(d as Record<string, unknown>));

        // If we have items in the DB, only show those to avoid showing duplicates or old fallbacks
        if (dbHighlights.length > 0) {
            return dbHighlights;
        }

        // Only use fallbacks if the DB is completely empty
        return getFallbackHighlights();
    } catch (err) {
        console.warn('DB error for highlights — using static fallback', err);
        return getFallbackHighlights();
    }
}

export async function addHighlight(data: Omit<Highlight, 'id'>): Promise<Highlight | null> {
    try {
        await connectDB();
        const sanitized = sanitizeData(data as Record<string, unknown>, HIGHLIGHT_FIELDS as string[]);
        const doc = await HighlightModel.create(sanitized);
        return toHighlight(doc.toObject());
    } catch (err) {
        console.error('Error adding highlight:', err);
        return null;
    }
}

export async function updateHighlight(id: string, data: Partial<Highlight>): Promise<Highlight | null> {
    try {
        await connectDB();
        const sanitized = sanitizeData(data as Record<string, unknown>, HIGHLIGHT_FIELDS as string[]);
        let doc = null;

        const isObjectId = mongoose.Types.ObjectId.isValid(id);
        if (isObjectId) {
            doc = await HighlightModel.findByIdAndUpdate(id, sanitized, { new: true }).lean();
        }

        // If not found by ID, it might be a fallback item being edited/promoted
        if (!doc && data.title) {
            const existing = await HighlightModel.findOne({ title: data.title }).lean();
            if (existing) {
                doc = await HighlightModel.findByIdAndUpdate(existing._id, sanitized, { new: true }).lean();
            } else {
                // Not in DB, promote from fallback to DB status
                const created = await HighlightModel.create({
                    title: data.title,
                    icon: data.icon || 'Target',
                    desc: data.desc || ''
                });
                doc = created.toObject();
            }
        }

        return doc ? toHighlight(doc as Record<string, unknown>) : null;
    } catch (err) {
        console.error('Error updating highlight:', err);
        return null;
    }
}

export async function deleteHighlight(id: string): Promise<boolean> {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // If it's a fallback ID (like 'h1'), we can't delete it from DB
            // But we shouldn't crash. We just return false because it's not in DB to delete.
            return false;
        }
        await connectDB();
        const result = await HighlightModel.findByIdAndDelete(id);
        return !!result;
    } catch (err) {
        console.error('Error deleting highlight:', err);
        return false;
    }
}
