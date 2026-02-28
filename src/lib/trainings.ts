import connectDB from './db';
import { Training as TrainingModel } from './models';
import fs from 'fs';
import path from 'path';

export interface Training {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    icon: string;
    image: string;
    modules: string[];
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
        modules: Array.isArray(doc.modules) ? doc.modules as string[] : [],
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
    const doc = await TrainingModel.create(data);
    return toTraining(doc.toObject());
}

export async function updateTraining(id: string, data: Partial<Training>): Promise<Training | null> {
    await connectDB();
    const doc = await TrainingModel.findByIdAndUpdate(id, data, { new: true }).lean();
    return doc ? toTraining(doc as Record<string, unknown>) : null;
}

export async function deleteTraining(id: string): Promise<boolean> {
    await connectDB();
    const result = await TrainingModel.findByIdAndDelete(id);
    return !!result;
}
