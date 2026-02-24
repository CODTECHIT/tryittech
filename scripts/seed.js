/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not set in .env');
    process.exit(1);
}

// ── Schemas ──────────────────────────────────────────────
const Training = mongoose.model('Training', new mongoose.Schema({
    slug: String, title: String, description: String, longDescription: String,
    icon: String, image: String, modules: [String],
}, { timestamps: true }));

const Service = mongoose.model('Service', new mongoose.Schema({
    slug: String, title: String, icon: String, image: String, secondaryImage: String,
    shortDescription: String, fullDescription: String, benefits: mongoose.Schema.Types.Mixed,
    process: mongoose.Schema.Types.Mixed,
}, { timestamps: true }));

const Industry = mongoose.model('Industry', new mongoose.Schema({
    slug: String, name: String, image: String, secondaryImage: String, icon: String,
    info: String, overview: String, segments: mongoose.Schema.Types.Mixed,
    solutions: mongoose.Schema.Types.Mixed, insights: mongoose.Schema.Types.Mixed,
    edge: mongoose.Schema.Types.Mixed,
}, { timestamps: true }));

async function seed() {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // ── Trainings ─────────────────────────────────────────
    const trainingsFile = path.join(__dirname, '../src/data/trainings.json');
    const trainings = JSON.parse(fs.readFileSync(trainingsFile, 'utf8'));
    await Training.deleteMany({});
    await Training.insertMany(trainings);
    console.log(`✅ Inserted ${trainings.length} trainings`);

    // ── Services ──────────────────────────────────────────
    const servicesFile = path.join(__dirname, '../src/data/services.json');
    const services = JSON.parse(fs.readFileSync(servicesFile, 'utf8'));
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`✅ Inserted ${services.length} services`);

    // ── Industries ────────────────────────────────────────
    const industriesFile = path.join(__dirname, '../src/data/industries.json');
    const industries = JSON.parse(fs.readFileSync(industriesFile, 'utf8'));
    await Industry.deleteMany({});
    await Industry.insertMany(industries);
    console.log(`✅ Inserted ${industries.length} industries`);

    await mongoose.disconnect();
    console.log('🎉 Seed complete!');
}

seed().catch(err => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
});
