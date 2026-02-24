import connectDB from './db';
import { Industry as IndustryModel } from './models';
import fs from 'fs';
import path from 'path';

export interface Industry {
    id: string;
    slug: string;
    name: string;
    image: string;
    secondaryImage: string;
    icon: string;
    info: string;
    overview: string;
    segments: { title: string; description: string }[];
    solutions: { title: string; description: string }[];
    insights: { title: string; category: string; image: string }[];
    edge: { title: string; description: string; icon: string }[];
}

function toIndustry(doc: Record<string, unknown>): Industry {
    return {
        id: String(doc._id || doc.id),
        slug: String(doc.slug || ''),
        name: String(doc.name || ''),
        image: String(doc.image || ''),
        secondaryImage: String(doc.secondaryImage || ''),
        icon: String(doc.icon || ''),
        info: String(doc.info || ''),
        overview: String(doc.overview || ''),
        segments: Array.isArray(doc.segments) ? doc.segments as Industry['segments'] : [],
        solutions: Array.isArray(doc.solutions) ? doc.solutions as Industry['solutions'] : [],
        insights: Array.isArray(doc.insights) ? doc.insights as Industry['insights'] : [],
        edge: Array.isArray(doc.edge) ? doc.edge as Industry['edge'] : [],
    };
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
        if (!docs || docs.length === 0) return getFallbackIndustries();
        return docs.map(d => toIndustry(d as Record<string, unknown>));
    } catch {
        console.warn('DB unavailable for industries — using static fallback');
        return getFallbackIndustries();
    }
}

export async function getIndustryBySlug(slug: string): Promise<Industry | undefined> {
    try {
        await connectDB();
        const doc = await IndustryModel.findOne({ slug }).lean();
        if (doc) return toIndustry(doc as Record<string, unknown>);
    } catch {
        console.warn('DB unavailable for industry slug — using fallback');
    }
    return getFallbackIndustries().find(i => i.slug === slug);
}

export async function addIndustry(data: Omit<Industry, 'id'>): Promise<Industry | null> {
    try {
        await connectDB();
        const doc = await IndustryModel.create(data);
        return toIndustry(doc.toObject());
    } catch (err) {
        console.error('Error adding industry:', err);
        return null;
    }
}

export async function updateIndustry(id: string, data: Partial<Industry>): Promise<Industry | null> {
    try {
        await connectDB();
        const doc = await IndustryModel.findByIdAndUpdate(id, data, { new: true }).lean();
        return doc ? toIndustry(doc as Record<string, unknown>) : null;
    } catch (err) {
        console.error('Error updating industry:', err);
        return null;
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
