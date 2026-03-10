import { connectDB } from './db';
import { ClientLogo } from './models';

export async function getClientLogos() {
    await connectDB();
    try {
        const logos = await ClientLogo.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(logos));
    } catch (error) {
        console.error('Database Error (getClientLogos):', error);
        return [];
    }
}

export async function addClientLogo(data: Record<string, unknown>) {
    await connectDB();
    try {
        const newLogo = await ClientLogo.create(data);
        return JSON.parse(JSON.stringify(newLogo));
    } catch (error) {
        console.error('Database Error (addClientLogo):', error);
        return null;
    }
}

export async function updateClientLogo(id: string, data: Record<string, unknown>) {
    await connectDB();
    try {
        const updatedLogo = await ClientLogo.findByIdAndUpdate(id, data, { new: true });
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
