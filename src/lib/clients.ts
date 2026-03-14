import { connectDB } from './db';
import { ClientLogo } from './models';
import { sanitizeData } from './security';

import fs from 'fs';
import path from 'path';

// Allowed fields for client logo operations
const CLIENT_FIELDS: string[] = ['name', 'logoUrl', 'industry', 'website'];

function getFallbackClients() {
    try {
        const filePath = path.join(process.cwd(), 'src/data/clients.json');
        if (!fs.existsSync(filePath)) return [];
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch {
        return [];
    }
}

export async function getClientLogos() {
    try {
        await connectDB();
        const logos = await ClientLogo.find({}).sort({ createdAt: -1 }).lean();

        // Return DB data if available
        if (logos && logos.length > 0) {
            return JSON.parse(JSON.stringify(logos));
        }

        // Fallback if DB is empty
        return getFallbackClients();
    } catch (error) {
        console.error('Database Error (getClientLogos):', error);
        return getFallbackClients();
    }
}

export async function addClientLogo(data: Record<string, unknown>) {
    await connectDB();
    try {
        // Sanitize input to prevent NoSQL injection
        const sanitized = sanitizeData(data, CLIENT_FIELDS);
        if (Object.keys(sanitized).length === 0) {
            console.error('No valid fields provided for client logo');
            return null;
        }
        const newLogo = await ClientLogo.create(sanitized);
        return JSON.parse(JSON.stringify(newLogo));
    } catch (error) {
        console.error('Database Error (addClientLogo):', error);
        return null;
    }
}

export async function updateClientLogo(id: string, data: Record<string, unknown>) {
    await connectDB();
    try {
        // Sanitize input to prevent NoSQL injection
        const sanitized = sanitizeData(data, CLIENT_FIELDS);
        if (Object.keys(sanitized).length === 0) {
            console.error('No valid fields provided for client logo update');
            return null;
        }
        const updatedLogo = await ClientLogo.findByIdAndUpdate(id, sanitized, { new: true });
        return JSON.parse(JSON.stringify(updatedLogo));
    } catch (error) {
        console.error('Database Error (updateClientLogo):', error);
        return null;
    }
}

export async function deleteClientLogo(id: string) {
    await connectDB();
    try {
        const deletedLogo = await ClientLogo.findByIdAndDelete(id);
        return !!deletedLogo;
    } catch (error) {
        console.error('Database Error (deleteClientLogo):', error);
        return false;
    }
}
