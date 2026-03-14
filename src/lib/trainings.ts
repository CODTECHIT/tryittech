import connectDB from './db';
import { Training as TrainingModel } from './models';
import { sanitizeData } from './security';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const TRAINING_FIELDS: (keyof Training)[] = ['slug', 'title', 'description', 'longDescription', 'icon', 'image', 'modules', 'startDate', 'keyHighlights', 'curriculumPdf', 'placedCount', 'placedLearners'];

export interface TrainingModule {
    title: string;
    startDate?: string;
    curriculumPdf?: string;
}

export interface PlacedLearner {
    name: string;
    photo: string;
}

export interface Training {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    icon: string;
    image: string;
    modules: (string | TrainingModule)[];
    startDate?: string;
    keyHighlights?: string[];
    curriculumPdf?: string;
    placedCount?: number;
    placedLearners?: PlacedLearner[];
}

function toTraining(doc: Record<string, unknown>): Training {
    return {
        id: String(doc._id || doc.id),
        slug: String(doc.slug || ''),
        title: String(doc.title || ''),
        description: String(doc.description || ''),
        longDescription: String(doc.longDescription || ''),
        icon: String(doc.icon || ''),
        image: String(doc.image || ''),
        // Handle both string[] (legacy) and TrainingModule[]
        modules: Array.isArray(doc.modules) ? doc.modules.map(m => {
            if (typeof m === 'string') return m;
            const obj = m as Record<string, unknown>;
            return {
                title: String(obj.title || ''),
                startDate: obj.startDate ? String(obj.startDate) : undefined,
                curriculumPdf: obj.curriculumPdf ? String(obj.curriculumPdf) : undefined,
            };
        }) : [],
        startDate: doc.startDate ? String(doc.startDate) : undefined,
        keyHighlights: Array.isArray(doc.keyHighlights) ? doc.keyHighlights as string[] : [],
        curriculumPdf: doc.curriculumPdf ? String(doc.curriculumPdf) : undefined,
        placedCount: Number(doc.placedCount || 0),
        placedLearners: Array.isArray(doc.placedLearners) ? doc.placedLearners as PlacedLearner[] : [],
    };
}

function getFallbackTrainings(): Training[] {
    try {
        const filePath = path.join(process.cwd(), 'src/data/trainings.json');
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch {
        return [];
    }
}

export async function getTrainings(): Promise<Training[]> {
    try {
        await connectDB();
        const docs = await TrainingModel.find({}).lean();
        const dbTrainings = (docs || []).map(d => toTraining(d as Record<string, unknown>));
        const fallback = getFallbackTrainings();

        // Combine them: DB records override fallback records with the same slug
        const merged = [...dbTrainings];
        fallback.forEach(ft => {
            if (!merged.some(m => m.id === ft.id || m.slug === ft.slug)) {
                merged.push(ft);
            }
        });

        return merged;
    } catch (err) {
        console.warn('DB error for trainings — using static fallback', err);
        return getFallbackTrainings();
    }
}

export async function getTrainingBySlug(slug: string): Promise<Training | undefined> {
    try {
        await connectDB();
        const doc = await TrainingModel.findOne({ slug }).lean();
        if (doc) return toTraining(doc as Record<string, unknown>);
    } catch {
        console.warn('DB unavailable for training slug — using fallback');
    }
    return getFallbackTrainings().find(t => t.slug === slug);
}

export async function addTraining(data: Omit<Training, 'id'>): Promise<Training> {
    await connectDB();
    const sanitized = sanitizeData(data as Record<string, unknown>, TRAINING_FIELDS as string[]);
    const doc = await TrainingModel.create(sanitized);
    return toTraining(doc.toObject());
}

export async function updateTraining(id: string, data: Partial<Training>): Promise<Training | null> {
    await connectDB();
    const sanitized = sanitizeData(data as Record<string, unknown>, TRAINING_FIELDS as string[]);

    // Check if it's a valid MongoDB ObjectId
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (isValidId) {
        // Normal DB update
        const doc = await TrainingModel.findByIdAndUpdate(id, sanitized, { new: true }).lean();
        return doc ? toTraining(doc as Record<string, unknown>) : null;
    } else {
        // The id is a fallback/static id (e.g. 'it-training') — promote to DB
        // Check if there's already a DB record with this slug (to avoid duplicates)
        const slug = (data.slug || id);
        const existing = await TrainingModel.findOne({ slug }).lean();
        if (existing) {
            const updated = await TrainingModel.findByIdAndUpdate(
                (existing as Record<string, unknown>)._id,
                sanitized,
                { new: true }
            ).lean();
            return updated ? toTraining(updated as Record<string, unknown>) : null;
        }
        // Create a brand new DB record from the full data
        const doc = await TrainingModel.create(sanitized);
        return toTraining(doc.toObject());
    }
}

export async function deleteTraining(id: string): Promise<boolean> {
    await connectDB();
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
        // Static fallback item — nothing in DB to delete
        return true;
    }
    const result = await TrainingModel.findByIdAndDelete(id);
    return !!result;
}

