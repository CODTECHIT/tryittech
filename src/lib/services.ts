import connectDB from './db';
import { Service as ServiceModel } from './models';
import fs from 'fs';
import path from 'path';

export interface Service {
    id: string;
    slug: string;
    title: string;
    icon: string;
    image: string;
    secondaryImage: string;
    shortDescription: string;
    fullDescription: string;
    benefits: string[];
    process: string[];
}

function isValidUrl(value: unknown): boolean {
    if (!value || typeof value !== 'string' || value.trim() === '') return false;
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

function toService(doc: Record<string, unknown>): Service {
    return {
        id: String(doc._id || doc.id),
        slug: String(doc.slug || ''),
        title: String(doc.title || ''),
        icon: String(doc.icon || ''),
        image: isValidUrl(doc.image) ? String(doc.image) : '',
        secondaryImage: isValidUrl(doc.secondaryImage) ? String(doc.secondaryImage) : '',
        shortDescription: String(doc.shortDescription || ''),
        fullDescription: String(doc.fullDescription || ''),
        benefits: Array.isArray(doc.benefits) ? doc.benefits as string[] : [],
        process: Array.isArray(doc.process) ? doc.process as string[] : [],
    };
}

function getFallbackServices(): Service[] {
    try {
        const filePath = path.join(process.cwd(), 'src/data/services.json');
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch {
        return [];
    }
}

export async function getServices(): Promise<Service[]> {
    try {
        await connectDB();
        const docs = await ServiceModel.find({}).lean();
        if (!docs || docs.length === 0) return getFallbackServices();
        return docs.map(d => toService(d as Record<string, unknown>));
    } catch {
        console.warn('DB unavailable for services — using static fallback');
        return getFallbackServices();
    }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
    try {
        await connectDB();
        const doc = await ServiceModel.findOne({ slug }).lean();
        if (doc) return toService(doc as Record<string, unknown>);
    } catch {
        console.warn('DB unavailable for service slug — using fallback');
    }
    return getFallbackServices().find(s => s.slug === slug);
}

export async function addService(data: Omit<Service, 'id'>): Promise<Service | null> {
    try {
        await connectDB();
        const doc = await ServiceModel.create(data);
        return toService(doc.toObject());
    } catch (err) {
        console.error('Error adding service:', err);
        return null;
    }
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service | null> {
    try {
        await connectDB();
        const doc = await ServiceModel.findByIdAndUpdate(id, data, { new: true }).lean();
        return doc ? toService(doc as Record<string, unknown>) : null;
    } catch (err) {
        console.error('Error updating service:', err);
        return null;
    }
}

export async function deleteService(id: string): Promise<boolean> {
    try {
        await connectDB();
        const result = await ServiceModel.findByIdAndDelete(id);
        return !!result;
    } catch (err) {
        console.error('Error deleting service:', err);
        return false;
    }
}
